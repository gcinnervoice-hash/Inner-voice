# Complete Docker Setup Guide - Inner Voice

## 📁 Complete Project Structure

```
Inner-voice/
├── docker-compose.yml           # 🎯 FULL STACK (Frontend + Backend + DB + Redis)
├── .env.example                 # Full stack environment template
├── .env                         # Your actual environment variables (create this)
│
├── Backend/
│   ├── docker/                  # Backend Docker files
│   │   ├── Dockerfile           # Backend production image
│   │   ├── docker-compose.yml   # Backend only
│   │   ├── docker-compose.dev.yml
│   │   ├── .dockerignore
│   │   ├── .env.example
│   │   ├── nginx.conf
│   │   ├── docker-commands.sh
│   │   ├── docker-commands.bat
│   │   ├── README.md            # Backend Docker docs
│   │   └── QUICK_START.md
│   ├── src/
│   ├── migrations/
│   └── package.json
│
└── Chatbot/
    ├── docker/                  # Frontend Docker files
    │   ├── Dockerfile           # Frontend production image (Vite + Nginx)
    │   ├── docker-compose.yml   # Frontend only
    │   ├── .dockerignore
    │   └── nginx.conf           # Nginx configuration for SPA
    ├── src/
    └── package.json
```

## 🚀 Quick Start - Full Stack

### Option 1: Run Everything Together (Recommended)

From project root (`Inner-voice/`):

```bash
# 1. Setup environment
cp .env.example .env
# Edit .env with your secrets

# 2. Start all services (Frontend + Backend + DB + Redis)
docker-compose up -d

# 3. Run database migrations
docker-compose exec backend npm run db:migrate

# 4. Test
curl http://localhost:5000/api/health  # Backend
curl http://localhost:3000             # Frontend
```

**Services:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### Option 2: Run Backend Only

From `Backend/` directory:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

### Option 3: Run Frontend Only

From `Chatbot/` directory:

```bash
docker-compose -f docker/docker-compose.yml up
```

## 🎯 Three Deployment Scenarios

### 1. Full Stack (Most Common)

**Use Case**: Deploy entire application together

```bash
# From project root
docker-compose up -d
```

**What runs:**
- ✅ Frontend (React + Nginx) - Port 3000
- ✅ Backend (Node.js API) - Port 5000
- ✅ PostgreSQL Database - Port 5432
- ✅ Redis Cache - Port 6379

**Architecture:**
```
User → Frontend (3000) → Backend (5000) → PostgreSQL + Redis
```

---

### 2. Backend Only (API Development)

**Use Case**: Developing/testing backend API separately

```bash
# From Backend directory
docker-compose -f docker/docker-compose.yml up -d
```

**What runs:**
- ✅ Backend API - Port 5000
- ✅ PostgreSQL - Port 5432
- ✅ Redis - Port 6379
- ❌ Frontend (run separately with `npm run dev`)

---

### 3. Frontend Only (UI Development)

**Use Case**: Developing UI with backend running elsewhere

```bash
# From Chatbot directory
docker-compose -f docker/docker-compose.yml up
```

**What runs:**
- ✅ Frontend (Nginx) - Port 3000
- ❌ Backend (needs to run separately or point to remote API)

---

## 📦 What's Containerized

### Frontend Container
**Image Size**: ~25MB (Alpine Nginx + built React app)

**Contents:**
- Built Vite/React application (static files)
- Nginx web server
- SPA routing configuration
- Gzip compression enabled
- Security headers configured

**Build Process:**
1. Install Node.js dependencies
2. Build with Vite (`npm run build`)
3. Copy dist/ to Nginx
4. Serve static files on port 80 (mapped to 3000)

---

### Backend Container
**Image Size**: ~150MB (Alpine Node.js + dependencies)

**Contents:**
- Node.js 18 runtime
- Compiled TypeScript (dist/)
- Production npm packages (47 dependencies)
- Migration scripts
- Non-root user execution

**Build Process:**
1. Install dependencies
2. Compile TypeScript to JavaScript
3. Install only production dependencies
4. Run as non-root user

---

## 🔧 Environment Variables

### Root-Level (.env at project root)

Used by **full-stack** docker-compose.yml:

```bash
# Ports
FRONTEND_PORT=3000
BACKEND_PORT=5000

# Database
POSTGRES_PASSWORD=secure_password

# Secrets
JWT_SECRET=your-secret-here
OPENAI_API_KEY=sk-...

# Frontend config
VITE_API_BASE_URL=http://localhost:5000
```

### Backend-Level (Backend/.env)

Used when running **backend-only**:

```bash
# Same variables as root-level
# See Backend/docker/.env.example
```

### Frontend Build-Time Variables

Vite variables (prefixed with `VITE_`):

```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-client-id
```

**Important**: Vite variables are embedded at **build time**, not runtime.

---

## 🌐 Networking

All services run on the same Docker network: `inner-voice-network`

### Service Communication (Inside Docker)

```
Frontend container → http://backend:5000/api
Backend container → postgresql://postgres:5432
Backend container → redis://redis:6379
```

### External Access (From Host)

```
Browser → http://localhost:3000 (Frontend)
Browser → http://localhost:5000 (Backend API)
Database tool → localhost:5432 (PostgreSQL)
Redis CLI → localhost:6379 (Redis)
```

---

## 📊 Docker Commands Cheat Sheet

### Full Stack Commands (from root)

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f postgres

# Rebuild after code changes
docker-compose build frontend
docker-compose build backend
docker-compose up -d

# Run migrations
docker-compose exec backend npm run db:migrate

# Access shells
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres -d inner_voice_db
docker-compose exec redis redis-cli

# Clean up (keeps data)
docker-compose down

# Clean up (DELETES DATA!)
docker-compose down -v

# Check status
docker-compose ps
```

### Backend Commands (from Backend/)

```bash
docker-compose -f docker/docker-compose.yml up -d
docker-compose -f docker/docker-compose.yml logs -f backend
docker-compose -f docker/docker-compose.yml down
```

### Frontend Commands (from Chatbot/)

```bash
docker-compose -f docker/docker-compose.yml up
docker-compose -f docker/docker-compose.yml down
```

---

## 🐛 Troubleshooting

### Frontend Not Loading

```bash
# Check if frontend is running
docker ps | grep frontend

# Check frontend logs
docker-compose logs frontend

# Check Nginx config
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf

# Test from inside container
docker-compose exec frontend wget -O- http://localhost/
```

### Frontend Can't Connect to Backend

**Problem**: API calls failing with CORS errors

**Solution 1**: Check ALLOWED_ORIGINS in .env
```bash
ALLOWED_ORIGINS=http://localhost:3000
```

**Solution 2**: Check VITE_API_BASE_URL
```bash
VITE_API_BASE_URL=http://localhost:5000
```

**Solution 3**: Rebuild frontend (Vite env vars are build-time)
```bash
docker-compose build frontend
docker-compose up -d frontend
```

### Port Already in Use

```bash
# Check what's using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Change port in .env
FRONTEND_PORT=3001
BACKEND_PORT=5001
```

### Database Connection Failed

```bash
# Check if postgres is healthy
docker-compose ps postgres

# Check postgres logs
docker-compose logs postgres

# Test connection manually
docker-compose exec backend node -e "const pg = require('pg'); const client = new pg.Client(process.env.DATABASE_URL); client.connect().then(() => console.log('OK')).catch(console.error)"
```

---

## 🚀 Production Deployment

### Build Production Images

```bash
# Tag with version
docker build -t inner-voice-frontend:1.0.0 -f Chatbot/docker/Dockerfile Chatbot/
docker build -t inner-voice-backend:1.0.0 -f Backend/docker/Dockerfile Backend/

# Push to registry (Docker Hub, AWS ECR, etc.)
docker tag inner-voice-frontend:1.0.0 your-registry/inner-voice-frontend:1.0.0
docker push your-registry/inner-voice-frontend:1.0.0
```

### Deploy to Cloud

**Railway.app** (Easiest):
1. Connect GitHub repo
2. Railway auto-detects Dockerfile
3. Add PostgreSQL and Redis databases
4. Set environment variables
5. Deploy!

**AWS ECS**:
- Push images to ECR
- Create ECS task definitions
- Deploy to ECS Fargate
- Use RDS + ElastiCache

**VPS (DigitalOcean, Linode)**:
```bash
# On server
git clone your-repo
cd Inner-voice
cp .env.example .env
# Edit .env
docker-compose up -d
```

---

## 🔐 Security Checklist

### Before Production

- [ ] Change default passwords in .env
- [ ] Generate new JWT secrets (64+ chars)
- [ ] Set strong POSTGRES_PASSWORD
- [ ] Set REDIS_PASSWORD
- [ ] Update ALLOWED_ORIGINS to your domain
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS (add SSL certificates)
- [ ] Enable firewall rules
- [ ] Review Nginx security headers
- [ ] Limit exposed ports

### Nginx Security Headers (Already Configured)

```nginx
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

---

## 📈 Performance Optimization

### Frontend Optimizations

✅ **Already Implemented:**
- Gzip compression (Nginx)
- Static asset caching (1 year)
- index.html no-cache
- Minified builds (Vite)
- Code splitting (Vite)

### Backend Optimizations

✅ **Already Implemented:**
- Multi-stage build (~150MB image)
- Production-only dependencies
- Health checks
- Non-root user

### Database Optimizations

```bash
# Enable connection pooling in backend code
# Use Redis for session caching (already configured)
# Add database indexes in migrations
```

---

## 🎯 Development Workflow

### Local Development (Without Docker)

```bash
# Terminal 1: Backend
cd Backend
npm install
npm run dev

# Terminal 2: Frontend
cd Chatbot
npm install
npm run dev

# Terminal 3: Services
docker-compose up postgres redis
```

### Local Development (With Docker - Full Stack)

```bash
# Start everything
docker-compose up

# Make code changes (auto-reload in dev mode)
# Frontend: Hot reload enabled (Vite)
# Backend: Use dev compose file for hot reload
```

### Production Build Testing

```bash
# Build and test prod images locally
docker-compose build
docker-compose up -d
# Test at http://localhost:3000
```

---

## 📚 Additional Resources

- **Backend Docker Docs**: `Backend/docker/README.md`
- **Backend Quick Start**: `Backend/docker/QUICK_START.md`
- **Management Scripts**: Use `Backend/docker/docker-commands.sh` or `.bat`

---

## ✨ Summary

You now have **three Docker setups**:

1. **Root docker-compose.yml** - Full stack (Frontend + Backend + DB)
2. **Backend/docker/** - Backend only (API + DB + Redis)
3. **Chatbot/docker/** - Frontend only (React + Nginx)

**Most common usage**:
```bash
# From project root
docker-compose up -d  # Start everything!
```

🎉 **Your entire Inner Voice application is now fully containerized!**
