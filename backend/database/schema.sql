-- backend/database/schema.sql
-- ATTRIBUTELY PRO Database Schema
-- Diseñado para escalabilidad y performance

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    plan VARCHAR(50) DEFAULT 'free',
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tracking pixels
CREATE TABLE tracking_pixels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pixel_id VARCHAR(50) UNIQUE NOT NULL,
    domain VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table (optimizada para millones de registros)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(100) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    page_url TEXT NOT NULL,
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_content VARCHAR(100),
    utm_term VARCHAR(100),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    country VARCHAR(2),
    city VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    value DECIMAL(10,2),
    properties JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversions table
CREATE TABLE conversions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id),
    session_id VARCHAR(100) NOT NULL,
    conversion_type VARCHAR(50) NOT NULL, -- 'purchase', 'lead', 'signup'
    value DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    product_name VARCHAR(255),
    quantity INTEGER DEFAULT 1,
    attributed_source VARCHAR(100),
    attributed_medium VARCHAR(100),
    attributed_campaign VARCHAR(100),
    attribution_model VARCHAR(50) DEFAULT 'last_click',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns table
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL, -- 'meta', 'google', 'whatsapp', 'tiktok'
    campaign_id_external VARCHAR(255), -- ID de la plataforma externa
    budget DECIMAL(10,2),
    daily_budget DECIMAL(10,2),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    targeting JSONB,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attribution models
CREATE TABLE attribution_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'first_click', 'last_click', 'linear', 'time_decay', 'position_based'
    window_days INTEGER DEFAULT 30,
    config JSONB,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table (para mejor tracking)
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    first_touch_source VARCHAR(100),
    first_touch_medium VARCHAR(100),
    first_touch_campaign VARCHAR(100),
    last_touch_source VARCHAR(100),
    last_touch_medium VARCHAR(100),
    last_touch_campaign VARCHAR(100),
    page_views INTEGER DEFAULT 1,
    duration_seconds INTEGER,
    is_converted BOOLEAN DEFAULT FALSE,
    conversion_value DECIMAL(10,2),
    country VARCHAR(2),
    device_type VARCHAR(50),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP
);

-- WhatsApp conversations
CREATE TABLE whatsapp_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    conversation_id VARCHAR(255),
    source_campaign VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'converted', 'closed'
    messages_count INTEGER DEFAULT 0,
    conversion_value DECIMAL(10,2),
    converted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fraud detection
CREATE TABLE fraud_detections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id),
    fraud_type VARCHAR(50) NOT NULL, -- 'bot', 'duplicate', 'suspicious_pattern'
    confidence_score DECIMAL(3,2), -- 0.00 - 1.00
    reason TEXT,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API integrations
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    account_id VARCHAR(255),
    config JSONB,
    status VARCHAR(20) DEFAULT 'active',
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

-- Performance metrics (cache table)
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    source VARCHAR(100),
    medium VARCHAR(100),
    campaign VARCHAR(100),
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    conversions BIGINT DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0,
    spend DECIMAL(12,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date, source, medium, campaign)
);

-- Indexes para performance
CREATE INDEX idx_events_user_timestamp ON events(user_id, timestamp DESC);
CREATE INDEX idx_events_session ON events(session_id);
CREATE INDEX idx_events_utm ON events(utm_source, utm_medium, utm_campaign);
CREATE INDEX idx_conversions_user_timestamp ON conversions(user_id, timestamp DESC);
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_session_id ON sessions(session_id);
CREATE INDEX idx_whatsapp_user ON whatsapp_conversations(user_id);
CREATE INDEX idx_fraud_event ON fraud_detections(event_id);
CREATE INDEX idx_performance_user_date ON performance_metrics(user_id, date DESC);

-- GIN indexes para JSONB
CREATE INDEX idx_events_properties ON events USING gin(properties);
CREATE INDEX idx_campaigns_targeting ON campaigns USING gin(targeting);

-- Function para update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para auto-update
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Default attribution models para nuevos usuarios
INSERT INTO attribution_models (name, type, window_days, config) VALUES
('First Click', 'first_click', 30, '{"description": "100% credit to first touchpoint"}'),
('Last Click', 'last_click', 30, '{"description": "100% credit to last touchpoint"}'),
('Linear', 'linear', 30, '{"description": "Equal credit to all touchpoints"}'),
('Time Decay', 'time_decay', 30, '{"decay_rate": 0.5, "description": "More recent touchpoints get more credit"}'),
('Position Based', 'position_based', 30, '{"first_touch": 0.4, "last_touch": 0.4, "middle_touches": 0.2, "description": "40% first, 40% last, 20% middle"}');

-- Views para analytics rápidos
CREATE VIEW daily_conversions AS
SELECT 
    user_id,
    DATE(timestamp) as date,
    COUNT(*) as conversions,
    SUM(value) as revenue,
    attributed_source,
    attributed_medium,
    attributed_campaign
FROM conversions 
GROUP BY user_id, DATE(timestamp), attributed_source, attributed_medium, attributed_campaign;

CREATE VIEW session_summary AS
SELECT 
    user_id,
    DATE(started_at) as date,
    COUNT(*) as sessions,
    SUM(CASE WHEN is_converted THEN 1 ELSE 0 END) as converted_sessions,
    AVG(duration_seconds) as avg_duration,
    SUM(page_views) as total_page_views
FROM sessions 
GROUP BY user_id, DATE(started_at);

-- Comentarios para documentación
COMMENT ON TABLE events IS 'Tabla principal de eventos de tracking';
COMMENT ON TABLE conversions IS 'Conversiones atribuidas con valor';
COMMENT ON TABLE sessions IS 'Sesiones de usuario con attribution data';
COMMENT ON TABLE whatsapp_conversations IS 'Conversaciones de WhatsApp Business';
COMMENT ON TABLE fraud_detections IS 'Detección de fraude con IA';
COMMENT ON TABLE performance_metrics IS 'Métricas agregadas para dashboard';