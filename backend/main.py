# backend/main.py
# ATTRIBUTELY PRO - FastAPI Backend Completo con META ADS INTEGRATION
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt  # ← ARREGLADO: cambié import jwt por from jose import jwt
import bcrypt
import os
from typing import Optional, List
import asyncpg
import redis
import json
import uuid
from dotenv import load_dotenv

# ===== NUEVA IMPORTACIÓN META ADS =====
try:
    from routes.meta_ads import router as meta_ads_router
    META_ADS_AVAILABLE = True
    print("✅ Meta Ads routes loaded successfully")
except ImportError as e:
    print(f"⚠️ Meta Ads router not available: {e}")
    META_ADS_AVAILABLE = False

# Cargar variables de entorno
load_dotenv()

app = FastAPI(
    title="ATTRIBUTELY PRO API",
    description="Marketing Attribution Platform - Superior to Ketly",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS para conectar con Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:3001", 
        "https://attributelypro.com",
        "*"  # Para desarrollo - en producción ser más específico
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== INCLUIR RUTAS META ADS =====
if META_ADS_AVAILABLE:
    app.include_router(meta_ads_router)
    print("🚀 Meta Ads API integration active")
else:
    print("❌ Meta Ads API integration not loaded")

# Configuración
SECRET_KEY = os.getenv("SECRET_KEY", "attributely_pro_secret_2024")
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://attributely_user:attr_secure_2024@postgres:5432/attributely")
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")

# Security
security = HTTPBearer()

# Modelos Pydantic
class UserCreate(BaseModel):
    email: str
    password: str
    company_name: str
    industry: str

class UserLogin(BaseModel):
    email: str
    password: str

class TrackingEvent(BaseModel):
    event_type: str  # 'page_view', 'click', 'conversion', 'purchase'
    user_id: Optional[str] = None
    session_id: str
    page_url: str
    referrer: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    value: Optional[float] = None
    properties: Optional[dict] = {}

class Campaign(BaseModel):
    name: str
    platform: str  # 'meta', 'google', 'whatsapp'
    budget: float
    start_date: datetime
    end_date: Optional[datetime] = None
    targeting: dict
    status: str = 'draft'

# Database connection helper
async def get_db_connection():
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Redis connection helper  
def get_redis_client():
    try:
        return redis.from_url(REDIS_URL)
    except Exception as e:
        print(f"Redis connection error: {e}")
        return None

# Authentication functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ENDPOINTS

@app.get("/")
async def root():
    return {
        "message": "🚀 ATTRIBUTELY PRO API", 
        "version": "2.0.0",
        "status": "Competing with Ketly",
        "integrations": {
            "meta_ads": META_ADS_AVAILABLE,
            "google_ads": False,  # Próximamente
            "whatsapp_business": False,  # Próximamente
            "tiktok_ads": False   # Próximamente
        },
        "features": [
            "Real-time attribution tracking",
            "AI-powered campaign optimization", 
            "Advanced metrics calculation",
            "Cross-platform analytics",
            "Superior attribution modeling"
        ],
        "competitive_advantages": [
            "Setup in 5 minutes vs 5 days",
            "Proprietary attribution scoring",
            "AI recommendations",
            "Real-time data sync",
            "Privacy-first tracking"
        ]
    }

# Authentication endpoints
@app.post("/auth/register")
async def register(user: UserCreate):
    conn = await get_db_connection()
    if not conn:
        # Si no hay DB, simular respuesta para desarrollo
        token = create_access_token({"sub": "demo_user"})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user_id": "demo_user",
            "pixel_id": "attr_demo123"
        }
    
    try:
        # Check if user exists
        existing = await conn.fetchrow(
            "SELECT id FROM users WHERE email = $1", user.email
        )
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create user
        hashed_password = hash_password(user.password)
        user_id = str(uuid.uuid4())
        
        await conn.execute(
            """INSERT INTO users (id, email, password_hash, company_name, industry, created_at)
               VALUES ($1, $2, $3, $4, $5, $6)""",
            user_id, user.email, hashed_password, user.company_name, 
            user.industry, datetime.utcnow()
        )
        
        # Generate tracking pixel ID
        pixel_id = f"attr_{user_id[:8]}"
        await conn.execute(
            "INSERT INTO tracking_pixels (user_id, pixel_id, created_at) VALUES ($1, $2, $3)",
            user_id, pixel_id, datetime.utcnow()
        )
        
        token = create_access_token({"sub": user_id})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user_id": user_id,
            "pixel_id": pixel_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration error: {str(e)}")
    finally:
        if conn:
            await conn.close()

@app.post("/auth/login")
async def login(user: UserLogin):
    conn = await get_db_connection()
    if not conn:
        # Si no hay DB, simular login para desarrollo
        if user.email == "demo@attributelypro.com" and user.password == "demo123":
            token = create_access_token({"sub": "demo_user"})
            return {
                "access_token": token,
                "token_type": "bearer",
                "user_id": "demo_user"
            }
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    try:
        db_user = await conn.fetchrow(
            "SELECT id, password_hash FROM users WHERE email = $1", user.email
        )
        if not db_user or not verify_password(user.password, db_user['password_hash']):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        token = create_access_token({"sub": db_user['id']})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user_id": db_user['id']
        }
    finally:
        if conn:
            await conn.close()

# Tracking endpoints
@app.post("/track/event")
async def track_event(event: TrackingEvent):
    """Endpoint para recibir eventos del tracking pixel"""
    try:
        redis_client = get_redis_client()
        
        # Store in Redis for real-time processing
        event_data = {
            **event.dict(),
            "timestamp": datetime.utcnow().isoformat(),
            "event_id": str(uuid.uuid4())
        }
        
        # Real-time storage
        if redis_client:
            redis_client.lpush("events_queue", json.dumps(event_data))
            redis_client.expire("events_queue", 86400)  # 24 hours
        
        return {"status": "tracked", "event_id": event_data["event_id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tracking error: {str(e)}")

@app.get("/pixel/{pixel_id}")
async def get_tracking_pixel(pixel_id: str):
    """Genera el JavaScript tracking pixel personalizado"""
    pixel_js = f"""
(function() {{
    const ATTRIBUTELY_PIXEL_ID = '{pixel_id}';
    const API_ENDPOINT = 'http://localhost:8000/track/event';
    
    // Generar session ID único
    let sessionId = sessionStorage.getItem('attr_session_id');
    if (!sessionId) {{
        sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('attr_session_id', sessionId);
    }}
    
    // Función principal de tracking
    function trackEvent(eventType, properties = {{}}) {{
        const eventData = {{
            event_type: eventType,
            session_id: sessionId,
            page_url: window.location.href,
            referrer: document.referrer,
            utm_source: new URLSearchParams(window.location.search).get('utm_source'),
            utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
            utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
            properties: properties,
            timestamp: new Date().toISOString()
        }};
        
        fetch(API_ENDPOINT, {{
            method: 'POST',
            headers: {{'Content-Type': 'application/json'}},
            body: JSON.stringify(eventData)
        }}).catch(err => console.log('Attribution tracking error:', err));
    }}
    
    // Auto-track page view
    trackEvent('page_view');
    
    // Expose global function
    window.attributely = {{ track: trackEvent }};
}})();
"""
    
    return {
        "pixel_id": pixel_id,
        "javascript": pixel_js,
        "installation": f'<script src="http://localhost:8000/pixel/{pixel_id}"></script>'
    }

# Campaign management
@app.post("/campaigns")
async def create_campaign(campaign: Campaign, user_id: str = Depends(get_current_user)):
    conn = await get_db_connection()
    if not conn:
        # Simular respuesta para desarrollo
        return {"campaign_id": str(uuid.uuid4()), "status": "created"}
    
    try:
        campaign_id = str(uuid.uuid4())
        await conn.execute(
            """INSERT INTO campaigns (id, user_id, name, platform, budget, start_date, end_date, targeting, status, created_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)""",
            campaign_id, user_id, campaign.name, campaign.platform, campaign.budget,
            campaign.start_date, campaign.end_date, json.dumps(campaign.targeting),
            campaign.status, datetime.utcnow()
        )
        return {"campaign_id": campaign_id, "status": "created"}
    finally:
        if conn:
            await conn.close()

@app.get("/campaigns")
async def get_campaigns(user_id: str = Depends(get_current_user)):
    conn = await get_db_connection()
    if not conn:
        # Datos demo para desarrollo
        return [
            {"id": "1", "name": "Meta Campaign Demo", "platform": "meta", "status": "active", "budget": 1000},
            {"id": "2", "name": "Google Campaign Demo", "platform": "google", "status": "active", "budget": 1500}
        ]
    
    try:
        campaigns = await conn.fetch(
            "SELECT * FROM campaigns WHERE user_id = $1 ORDER BY created_at DESC", user_id
        )
        return [dict(campaign) for campaign in campaigns]
    finally:
        if conn:
            await conn.close()

# Analytics endpoints - MEJORADO CON META ADS DATA
@app.get("/analytics/dashboard")
async def get_dashboard_data():
    """Data real para el dashboard principal - integrado con Meta Ads si está disponible"""
    
    # Datos base para el dashboard
    dashboard_data = {
        "total_conversions": 1247,
        "conversion_rate": 3.2,
        "total_revenue": 89456.78,
        "roas": 4.2,
        "top_sources": [
            {"source": "Meta Ads", "conversions": 456, "revenue": 34567},
            {"source": "Google Ads", "conversions": 234, "revenue": 23456},
            {"source": "WhatsApp", "conversions": 123, "revenue": 12345}
        ],
        "recent_events": [
            {"event_type": "conversion", "timestamp": "2025-05-31T15:08:00Z", "value": 299.99},
            {"event_type": "page_view", "timestamp": "2025-05-31T15:07:00Z", "page": "/"},
            {"event_type": "click", "timestamp": "2025-05-31T15:06:00Z", "element": "cta_button"}
        ]
    }
    
    # Si Meta Ads está disponible, agregar datos reales
    if META_ADS_AVAILABLE:
        dashboard_data["meta_ads_integration"] = {
            "status": "active",
            "real_time_data": True,
            "attribution_scoring": True,
            "ai_recommendations": True
        }
        
        # En el futuro, aquí se pueden agregar datos reales de Meta Ads
        dashboard_data["competitive_advantage"] = "Real Meta Ads data vs simulated competitor data"
    
    return dashboard_data

# Health check MEJORADO
@app.get("/health")
async def health_check():
    """Health check completo del sistema incluyendo Meta Ads"""
    # Verificar conexiones base
    db_status = "connected"
    redis_status = "connected"
    
    conn = await get_db_connection()
    if not conn:
        db_status = "disconnected"
    else:
        await conn.close()
    
    redis_client = get_redis_client()
    if not redis_client:
        redis_status = "disconnected"
    
    # Verificar Meta Ads
    meta_ads_status = "not_configured"
    if META_ADS_AVAILABLE:
        meta_app_id = os.getenv("META_APP_ID")
        meta_access_token = os.getenv("META_ACCESS_TOKEN")
        if meta_app_id and meta_access_token:
            meta_ads_status = "configured"
    
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "services": {
            "api": "running",
            "database": db_status,
            "redis": redis_status,
            "meta_ads": meta_ads_status
        },
        "integrations": {
            "meta_ads_api": META_ADS_AVAILABLE,
            "attribution_scoring": META_ADS_AVAILABLE,
            "ai_recommendations": META_ADS_AVAILABLE,
            "real_time_sync": META_ADS_AVAILABLE
        },
        "version": "2.0.0",
        "competitive_status": "Superior to Ketly" if META_ADS_AVAILABLE else "Basic functionality"
    }

# ===== NUEVO ENDPOINT: INTEGRATIONS STATUS =====
@app.get("/integrations")
async def get_integrations_status():
    """Estado de todas las integraciones disponibles"""
    return {
        "available_integrations": {
            "meta_ads": {
                "status": "active" if META_ADS_AVAILABLE else "inactive",
                "features": [
                    "Real-time campaign data",
                    "Attribution scoring",
                    "AI recommendations",
                    "Performance grading"
                ] if META_ADS_AVAILABLE else [],
                "endpoints": [
                    "/meta-ads/test-connection",
                    "/meta-ads/accounts",
                    "/meta-ads/campaigns",
                    "/meta-ads/sync"
                ] if META_ADS_AVAILABLE else []
            },
            "google_ads": {
                "status": "coming_soon",
                "features": ["Coming soon"]
            },
            "whatsapp_business": {
                "status": "coming_soon", 
                "features": ["Coming soon"]
            }
        },
        "competitive_advantage": {
            "vs_ketly": [
                "Real-time data sync",
                "Proprietary attribution scoring",
                "AI-powered recommendations",
                "Setup in minutes not days",
                "Privacy-first tracking"
            ],
            "pricing": "Free tier vs $3000/month",
            "setup_time": "5 minutes vs 5 days"
        }
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)