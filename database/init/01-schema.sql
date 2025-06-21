-- =====================================================
-- ATTRIBUTELYPRO DATABASE SCHEMA
-- Enterprise Attribution & Customer Journey Tracking
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Users/Visitors tracking
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) UNIQUE NOT NULL, -- Our internal user ID
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    device_fingerprint TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    country_code VARCHAR(2),
    city VARCHAR(100),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions tracking
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    landing_page TEXT,
    referrer TEXT,
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    operating_system VARCHAR(100),
    ip_address INET,
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attribution events (core tracking)
CREATE TABLE attribution_events (
    id BIGSERIAL PRIMARY KEY,
    event_id UUID UNIQUE DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    
    -- Platform information
    platform VARCHAR(50) NOT NULL, -- meta, google, tiktok, youtube
    campaign_id VARCHAR(255),
    ad_group_id VARCHAR(255),
    ad_id VARCHAR(255),
    creative_id VARCHAR(255),
    keyword VARCHAR(255),
    
    -- Event details
    event_type VARCHAR(50) NOT NULL, -- impression, click, view, conversion
    event_value DECIMAL(12,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Attribution weights (calculated)
    first_click_weight DECIMAL(5,4) DEFAULT 0,
    last_click_weight DECIMAL(5,4) DEFAULT 0,
    linear_weight DECIMAL(5,4) DEFAULT 0,
    time_decay_weight DECIMAL(5,4) DEFAULT 0,
    position_based_weight DECIMAL(5,4) DEFAULT 0,
    
    -- Metadata
    page_url TEXT,
    referrer TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversions tracking
CREATE TABLE conversions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    
    -- Conversion details
    conversion_type VARCHAR(100) NOT NULL, -- purchase, lead, signup, etc
    conversion_value DECIMAL(12,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Product/Service details
    product_id VARCHAR(255),
    product_name VARCHAR(255),
    product_category VARCHAR(255),
    quantity INTEGER DEFAULT 1,
    
    -- Attribution (calculated)
    attributed_platform VARCHAR(50),
    attributed_campaign_id VARCHAR(255),
    attributed_ad_id VARCHAR(255),
    attribution_model VARCHAR(50), -- first_click, last_click, linear, etc
    attribution_confidence DECIMAL(5,4),
    
    -- Timing
    time_to_conversion INTEGER, -- seconds from first touch
    touchpoints_count INTEGER DEFAULT 0,
    
    converted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PLATFORM-SPECIFIC TABLES
-- =====================================================

-- Meta Ads campaigns sync
CREATE TABLE meta_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id VARCHAR(255) UNIQUE NOT NULL,
    account_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    objective VARCHAR(100),
    status VARCHAR(50),
    daily_budget DECIMAL(10,2),
    lifetime_budget DECIMAL(10,2),
    
    -- Performance metrics (synced from API)
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    spend DECIMAL(10,2) DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    conversion_value DECIMAL(10,2) DEFAULT 0,
    
    -- Calculated metrics
    cpm DECIMAL(8,4) DEFAULT 0,
    cpc DECIMAL(8,4) DEFAULT 0,
    ctr DECIMAL(6,4) DEFAULT 0,
    roas DECIMAL(8,4) DEFAULT 0,
    
    created_time TIMESTAMP WITH TIME ZONE,
    updated_time TIMESTAMP WITH TIME ZONE,
    last_synced TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Google Ads campaigns sync
CREATE TABLE google_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id VARCHAR(255) UNIQUE NOT NULL,
    customer_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    campaign_type VARCHAR(100),
    status VARCHAR(50),
    budget_amount DECIMAL(10,2),
    
    -- Performance metrics
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    cost DECIMAL(10,2) DEFAULT 0,
    conversions DECIMAL(8,2) DEFAULT 0,
    conversion_value DECIMAL(10,2) DEFAULT 0,
    
    -- Calculated metrics
    average_cpm DECIMAL(8,4) DEFAULT 0,
    average_cpc DECIMAL(8,4) DEFAULT 0,
    ctr DECIMAL(6,4) DEFAULT 0,
    roas DECIMAL(8,4) DEFAULT 0,
    
    last_synced TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TikTok Ads campaigns sync
CREATE TABLE tiktok_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id VARCHAR(255) UNIQUE NOT NULL,
    advertiser_id VARCHAR(255) NOT NULL,
    campaign_name VARCHAR(255) NOT NULL,
    objective_type VARCHAR(100),
    campaign_type VARCHAR(100),
    status VARCHAR(50),
    budget DECIMAL(10,2),
    
    -- Performance metrics
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    spend DECIMAL(10,2) DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    conversion_value DECIMAL(10,2) DEFAULT 0,
    
    -- TikTok specific metrics
    video_views BIGINT DEFAULT 0,
    video_views_p25 BIGINT DEFAULT 0,
    video_views_p50 BIGINT DEFAULT 0,
    video_views_p75 BIGINT DEFAULT 0,
    video_views_p100 BIGINT DEFAULT 0,
    
    last_synced TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- YouTube Analytics sync
CREATE TABLE youtube_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    video_id VARCHAR(255) UNIQUE NOT NULL,
    channel_id VARCHAR(255) NOT NULL,
    title VARCHAR(500),
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Performance metrics
    views BIGINT DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    watch_time_minutes BIGINT DEFAULT 0,
    average_view_duration DECIMAL(8,2) DEFAULT 0,
    
    -- Calculated attribution
    attributed_clicks INTEGER DEFAULT 0,
    attributed_conversions INTEGER DEFAULT 0,
    attributed_value DECIMAL(10,2) DEFAULT 0,
    
    last_synced TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ML & ANALYTICS TABLES
-- =====================================================

-- ML model predictions
CREATE TABLE ml_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    
    -- Predictions
    predicted_ltv DECIMAL(10,2),
    conversion_probability DECIMAL(5,4),
    churn_probability DECIMAL(5,4),
    optimal_bid DECIMAL(8,4),
    recommended_platform VARCHAR(50),
    
    confidence_score DECIMAL(5,4),
    features_used JSONB,
    prediction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- A/B test tracking
CREATE TABLE ab_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_name VARCHAR(255) NOT NULL,
    variant VARCHAR(100) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    
    test_start TIMESTAMP WITH TIME ZONE,
    test_end TIMESTAMP WITH TIME ZONE,
    converted BOOLEAN DEFAULT FALSE,
    conversion_value DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users table indexes
CREATE INDEX idx_users_user_id ON users(user_id);
CREATE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL;
CREATE INDEX idx_users_device_fingerprint ON users(device_fingerprint);

-- Sessions table indexes
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_session_id ON sessions(session_id);
CREATE INDEX idx_sessions_started_at ON sessions(started_at);
CREATE INDEX idx_sessions_utm_campaign ON sessions(utm_campaign) WHERE utm_campaign IS NOT NULL;

-- Attribution events indexes (CRITICAL FOR PERFORMANCE)
CREATE INDEX idx_attribution_user_id ON attribution_events(user_id);
CREATE INDEX idx_attribution_session_id ON attribution_events(session_id);
CREATE INDEX idx_attribution_platform ON attribution_events(platform);
CREATE INDEX idx_attribution_timestamp ON attribution_events(timestamp);
CREATE INDEX idx_attribution_campaign ON attribution_events(campaign_id) WHERE campaign_id IS NOT NULL;
CREATE INDEX idx_attribution_event_type ON attribution_events(event_type);
CREATE INDEX idx_attribution_user_timestamp ON attribution_events(user_id, timestamp);
CREATE INDEX idx_attribution_platform_campaign ON attribution_events(platform, campaign_id);

-- Conversions table indexes
CREATE INDEX idx_conversions_user_id ON conversions(user_id);
CREATE INDEX idx_conversions_session_id ON conversions(session_id);
CREATE INDEX idx_conversions_type ON conversions(conversion_type);
CREATE INDEX idx_conversions_converted_at ON conversions(converted_at);
CREATE INDEX idx_conversions_attributed_platform ON conversions(attributed_platform);

-- Campaign tables indexes
CREATE INDEX idx_meta_campaigns_account_id ON meta_campaigns(account_id);
CREATE INDEX idx_meta_campaigns_campaign_id ON meta_campaigns(campaign_id);
CREATE INDEX idx_meta_campaigns_last_synced ON meta_campaigns(last_synced);

CREATE INDEX idx_google_campaigns_customer_id ON google_campaigns(customer_id);
CREATE INDEX idx_google_campaigns_campaign_id ON google_campaigns(campaign_id);

CREATE INDEX idx_tiktok_campaigns_advertiser_id ON tiktok_campaigns(advertiser_id);
CREATE INDEX idx_tiktok_campaigns_campaign_id ON tiktok_campaigns(campaign_id);

-- ML predictions indexes
CREATE INDEX idx_ml_predictions_user_id ON ml_predictions(user_id);
CREATE INDEX idx_ml_predictions_model_name ON ml_predictions(model_name);
CREATE INDEX idx_ml_predictions_prediction_date ON ml_predictions(prediction_date);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate attribution weights
CREATE OR REPLACE FUNCTION calculate_attribution_weights()
RETURNS TRIGGER AS $$
DECLARE
    total_touchpoints INTEGER;
    touchpoint_position INTEGER;
    time_diff_hours DECIMAL;
BEGIN
    -- This is a simplified version - full implementation would be more complex
    
    -- Linear attribution (equal weight)
    SELECT COUNT(*) INTO total_touchpoints
    FROM attribution_events 
    WHERE user_id = NEW.user_id 
    AND timestamp <= NEW.timestamp;
    
    IF total_touchpoints > 0 THEN
        NEW.linear_weight = 1.0 / total_touchpoints;
        
        -- First click gets 100% if first touchpoint
        IF total_touchpoints = 1 THEN
            NEW.first_click_weight = 1.0;
        END IF;
        
        -- Last click gets 100% (will be updated when newer events come)
        UPDATE attribution_events 
        SET last_click_weight = 0 
        WHERE user_id = NEW.user_id;
        
        NEW.last_click_weight = 1.0;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for attribution events
CREATE TRIGGER calculate_attribution_weights_trigger
    BEFORE INSERT ON attribution_events
    FOR EACH ROW EXECUTE FUNCTION calculate_attribution_weights();

-- =====================================================
-- INITIAL DATA SETUP
-- =====================================================

-- Insert some basic reference data
INSERT INTO users (user_id, email, country_code) VALUES 
('demo_user_1', 'demo@attributelypro.com', 'US'),
('demo_user_2', 'test@attributelypro.com', 'EC')
ON CONFLICT (user_id) DO NOTHING;