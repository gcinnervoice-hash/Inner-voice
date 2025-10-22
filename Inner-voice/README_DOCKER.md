# Docker Setup - Inner Voice Project

## 🎯 All Docker Files Organized!

Your entire Inner Voice project is now fully containerized with Docker files organized in dedicated folders.

## 📁 Project Structure

```
Inner-voice/
├── docker-compose.yml              # 🌟 FULL STACK - Run everything together
├── .env.example                    # Environment template for full stack
├── DOCKER_COMPLETE_GUIDE.md        # Comprehensive documentation
│
├── Backend/
│   └── docker/                     # 📦 Backend Docker files
│       ├── Dockerfile              # Backend API image
│       ├── docker-compose.yml      # Backend + DB + Redis
│       ├── docker-compose.dev.yml  # Development mode
│       ├── .dockerignore
│       ├── .env.example
│       ├── docker-commands.sh      # Management tool (Linux/Mac)
│       ├── docker-commands.bat     # Management tool (Windows)
│       ├── README.md               # Backend Docker docs (650+ lines)
│       └── QUICK_START.md          # Quick reference
│
└── Chatbot/
    └── docker/                     # 📦 Frontend Docker files
        ├── Dockerfile              # Frontend (Vite + Nginx)
        ├── docker-compose.yml      # Frontend only
        ├── .dockerignore
        └── nginx.conf              # Nginx config for SPA
```

## 🚀 Quick Start

### Run Full Stack (Recommended)

```bash
# From project root (Inner-voice/)
cp .env.example .env
# Edit .env with your secrets (JWT_SECRET, OPENAI_API_KEY, etc.)

docker-compose up -d
docker-compose exec backend npm run db:migrate

# Access:
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```

### Run Backend Only

```bash
# From Backend/ directory
docker-compose -f docker/docker-compose.yml up -d
```

### Run Frontend Only

```bash
# From Chatbot/ directory
docker-compose -f docker/docker-compose.yml up
```

## 📦 What's Containerized

### ✅ Frontend (Chatbot)
- **Image**: React + Vite + Nginx (~25MB)
- **Port**: 3000
- **Features**: SPA routing, gzip, caching, security headers

### ✅ Backend (API Server)
- **Image**: Node.js 18 + Express (~150MB)
- **Port**: 5000
- **Features**: Multi-stage build, non-root user, health checks

### ✅ PostgreSQL Database
- **Image**: PostgreSQL 15 Alpine
- **Port**: 5432
- **Features**: Persistent volumes, auto-migrations

### ✅ Redis Cache
- **Image**: Redis 7 Alpine
- **Port**: 6379
- **Features**: Persistent storage, optional password

## 📚 Documentation

| File | Description |
|------|-------------|
| `DOCKER_COMPLETE_GUIDE.md` | **Start here** - Full documentation with all scenarios |
| `Backend/docker/README.md` | Backend Docker details (650+ lines) |
| `Backend/docker/QUICK_START.md` | Backend quick reference |
| `Backend/DOCKER_SUMMARY.md` | Backend Docker summary |

## 🛠️ Management Tools

**Interactive Scripts:**
```bash
# Linux/Mac/Git Bash
cd Backend/docker
./docker-commands.sh

# Windows
cd Backend\docker
docker-commands.bat
```

20+ automated operations: start, stop, logs, migrations, backups, shell access, etc.

## 🔧 Common Commands

```bash
# Start full stack
docker-compose up -d

# View logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Stop services
docker-compose down

# Run migrations
docker-compose exec backend npm run db:migrate

# Database shell
docker-compose exec postgres psql -U postgres -d inner_voice_db

# Backend shell
docker-compose exec backend sh

# Rebuild after code changes
docker-compose build backend frontend
docker-compose up -d
```

## 🌐 Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 5000 | http://localhost:5000 |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |

## 🔐 Required Environment Variables

**Minimum required in .env:**

```bash
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-64-char-secret-here
JWT_REFRESH_SECRET=your-64-char-secret-here

# Get from: https://platform.openai.com/
OPENAI_API_KEY=sk-your-openai-api-key-here

# Database password
POSTGRES_PASSWORD=secure-password-here
```

## 🚀 Deployment

Your Docker setup works with all major platforms:

✅ **Railway.app** - Easiest (5 minutes to production)
✅ **AWS ECS** - Production-grade auto-scaling
✅ **Google Cloud Run** - Pay-per-request
✅ **DigitalOcean/VPS** - Full control
✅ **Docker Swarm** - Multi-server setup

See `DOCKER_COMPLETE_GUIDE.md` for deployment instructions.

## 🧹 Cleanup Old Files (Optional)

Old Docker files in `Backend/` root are duplicates:

```bash
cd Backend
rm Dockerfile docker-compose*.yml .dockerignore .env.docker.example DOCKER.md docker-commands.*
```

See `Backend/CLEANUP_OLD_DOCKER_FILES.md` for details.

## 📈 Architecture

```
┌─────────────────────────────────────────────────────┐
│                Docker Network                        │
│            (inner-voice-network)                     │
│                                                       │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────┐│
│  │ Frontend │   │ Backend  │   │   PostgreSQL     ││
│  │  (3000)  │──►│  (5000)  │──►│     (5432)       ││
│  │  Nginx   │   │ Node.js  │   │                  ││
│  └──────────┘   └──────────┘   │   Redis (6379)   ││
│                       │         │                  ││
│                       └─────────►                  ││
│                                 └──────────────────┘│
└─────────────────────────────────────────────────────┘
         │
         ▼
   User Browser
```

## ✨ Key Features

✅ **Organized** - All Docker files in dedicated folders
✅ **Flexible** - Run full stack, backend only, or frontend only
✅ **Production-Ready** - Multi-stage builds, security best practices
✅ **Well-Documented** - 1000+ lines of comprehensive documentation
✅ **Easy Management** - Interactive scripts for common tasks
✅ **Portable** - Works on Windows, Mac, Linux
✅ **Cloud-Ready** - Deploy to any cloud platform

## 🎯 Next Steps

1. **Read**: `DOCKER_COMPLETE_GUIDE.md` for comprehensive documentation
2. **Setup**: Copy `.env.example` to `.env` and configure
3. **Start**: Run `docker-compose up -d` from project root
4. **Test**: Visit http://localhost:3000
5. **Deploy**: Choose a platform and deploy!

## 💡 Quick Tips

- **Full stack development**: `docker-compose up` from root
- **Backend API development**: `docker-compose -f Backend/docker/docker-compose.yml up`
- **Frontend UI development**: `npm run dev` in Chatbot/ (faster than Docker)
- **Check logs**: `docker-compose logs -f [service-name]`
- **Clean restart**: `docker-compose down && docker-compose up -d`

---

**🎉 Your Inner Voice project is fully containerized and ready for deployment!**

For questions or issues, check the comprehensive guides in the documentation files.
