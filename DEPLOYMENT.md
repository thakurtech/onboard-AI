# Production Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Vercel (Client) + Railway (Server) - RECOMMENDED

#### Deploy Client to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from client directory
cd client
vercel --prod
```

**Environment Variables in Vercel:**
- `NEXT_PUBLIC_API_URL` = Your Railway server URL (e.g., `https://your-app.railway.app`)

#### Deploy Server to Railway
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `/server`
5. Add environment variables:
   - `DATABASE_URL` (Railway will provide PostgreSQL)
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `CORS_ORIGIN` (Your Vercel URL)
   - `NODE_ENV=production`

6. Add PostgreSQL plugin in Railway
7. Deploy!

---

### Option 2: Docker Compose (VPS/Cloud)

```bash
# Create .env file in root
cp .env.example .env
# Fill in your production values

# Build and run
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 📋 Pre-Deployment Checklist

- [ ] Set all environment variables
- [ ] Update CORS_ORIGIN to production domain
- [ ] Generate strong JWT_SECRET (32+ characters)
- [ ] Test database migrations locally
- [ ] Verify Gemini API key works
- [ ] Update frontend API_URL to production
- [ ] Enable rate limiting
- [ ] Configure custom domain

---

## 🗄️ Database Setup

### Run Migrations

```bash
# On your server/Railway
cd server
npm run migrate
```

Migrations will create:
- Users table
- Onboarding plans & phases
- Courses & lessons
- Interview sessions & feedback

---

## 🔒 Security Checklist

-✅ CORS configured for production domain
- ✅ Rate limiting enabled (100 req/15min)
- ✅ Helmet security headers
- ✅ Environment variables secure
- ✅ Health check endpoints
- [ ] SSL/TLS certificate (auto with Vercel/Railway)
- [ ] Database backups configured

---

## 📊 Monitoring

### Health Checks
- `GET /health` - Basic server health
- `GET /health/db` - Database connectivity

### Logs
- Check Railway/Vercel dashboards
- Monitor error rates
- Track API response times

---

## 🔄 CI/CD Pipeline

GitHub Actions automatically:
1. Builds client & server on push
2. Runs tests (when added)
3. Deploys to production on `main` branch push

---

## 🆘 Troubleshooting

### Client can't reach server
- Check CORS_ORIGIN includes your domain
- Verify NEXT_PUBLIC_API_URL is correct
- Check server is running: `curl https://your-server/health`

### Database connection fails
- Verify DATABASE_URL format
- Check PostgreSQL is running
- Run migrations: `npm run migrate`

### Gemini API errors
- Verify GEMINI_API_KEY is set
- Check API quota/limits
- Test with: `curl http://localhost:5000/api/ai/chat`

---

## 📝 Production URLs

After deployment, update these:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app`
- Database: Managed by Railway

---

## 🎉 You're Ready!

Your app is now production-ready with:
- ✅ Secure authentication
- ✅ AI Voice Interviewer
- ✅ Onboarding & Course generation
- ✅ Docker containerization
- ✅ CI/CD pipeline
- ✅ Database migrations
- ✅ Rate limiting & security headers

**Need help?** Check the troubleshooting section or deployment logs!
