# Frontend Deployment Guide

This guide covers deploying **The Entrepreneurial Chronicles** Next.js application to various hosting platforms.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 18+ installed
- ✅ All dependencies installed (`npm install`)
- ✅ Production build tested locally (`npm run build`)
- ✅ Environment variables configured
- ✅ Sanity CMS project set up and accessible

## 🔧 Pre-Deployment Checklist

### 1. Test Production Build Locally

```bash
# Build the application
npm run build

# Test the production build
npm start
```

Visit `http://localhost:3000` and verify everything works correctly.

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

**Required Environment Variables:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset (usually "production")
- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version (default: "2023-05-03")
- `NEXT_PUBLIC_SITE_URL` - Your production site URL

**Optional Environment Variables:**
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - For contact forms
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - For contact forms
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - For contact forms
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For Google Maps integration

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications as it's built by the Next.js team.

#### Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

#### Step 2: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Step 3: Deploy via Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
     NEXT_PUBLIC_SANITY_DATASET=production
     NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
     NEXT_PUBLIC_SANITY_USE_CDN=false
     NEXT_PUBLIC_SITE_URL=https://yourdomain.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site will be live at `your-project.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

#### Vercel Configuration

The project includes a `vercel.json` file with optimized settings:
- Automatic Next.js detection
- Optimized build commands
- Region configuration (US East)

### Option 2: Netlify

#### Step 1: Build Settings

Create `netlify.toml` in the root directory:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Step 2: Deploy

1. **Push to Git** (GitHub/GitLab/Bitbucket)

2. **Import in Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Install Netlify Next.js plugin

4. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all required variables

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy

### Option 3: AWS Amplify

#### Step 1: Push to Git

Push your code to GitHub/GitLab/Bitbucket.

#### Step 2: Deploy

1. **Go to AWS Amplify Console**
   - Visit [aws.amazon.com/amplify](https://aws.amazon.com/amplify)

2. **Connect Repository**
   - Click "New app" → "Host web app"
   - Connect your Git provider
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Output directory: `.next`
   - Base directory: `/` (root)

4. **Add Environment Variables**
   - In Amplify Console → App Settings → Environment Variables
   - Add all required variables

5. **Deploy**
   - Click "Save and deploy"
   - Amplify will build and deploy

### Option 4: Docker Deployment

#### Step 1: Create Dockerfile

Create `Dockerfile` in the root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Step 2: Update next.config.js

Add output configuration:

```javascript
const nextConfig = {
  output: 'standalone',
  // ... rest of your config
};
```

#### Step 3: Build and Run

```bash
# Build Docker image
docker build -t magazine-app .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SANITY_PROJECT_ID=your_id \
  -e NEXT_PUBLIC_SANITY_DATASET=production \
  -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  magazine-app
```

### Option 5: Traditional VPS/Server

#### Step 1: Build on Server

```bash
# SSH into your server
ssh user@your-server.com

# Clone repository
git clone your-repo-url
cd new-magazine

# Install dependencies
npm install

# Build application
npm run build
```

#### Step 2: Run with PM2

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "magazine" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### Step 3: Setup Nginx (Reverse Proxy)

Create `/etc/nginx/sites-available/magazine`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/magazine /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔍 Post-Deployment Verification

After deployment, verify:

1. **Homepage loads correctly**
   - Visit your site URL
   - Check for console errors

2. **Sanity CMS connection**
   - Verify content loads from Sanity
   - Check network tab for API calls

3. **Static pages**
   - Test `/about-us`, `/contact`, `/blogs`, `/magazines`

4. **Dynamic routes**
   - Test individual post pages
   - Test category pages

5. **API routes**
   - Test `/api/sitemap` or `/sitemap.xml`
   - Test `/api/feed` or `/rss.xml`

6. **Images**
   - Verify images load correctly
   - Check Sanity CDN images

7. **SEO**
   - Check meta tags in page source
   - Verify sitemap is accessible

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: Sanity connection issues**
- Verify environment variables are set correctly
- Check Sanity project ID and dataset name
- Ensure Sanity project is accessible

### Runtime Errors

**Error: Environment variables not loading**
- Verify variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Restart the application after adding new variables
- Check deployment platform's environment variable configuration

**Error: Images not loading**
- Verify `next.config.js` has correct `remotePatterns` for Sanity CDN
- Check image URLs in browser network tab

### Performance Issues

**Slow page loads**
- Enable Sanity CDN: Set `NEXT_PUBLIC_SANITY_USE_CDN=true`
- Verify images are optimized
- Check build output for static vs dynamic pages

## 📊 Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
   - Built-in performance monitoring
   - Real-time analytics

2. **Google Analytics**
   - Add tracking code to `_app.js`

3. **Sentry** (Error Tracking)
   - Monitor production errors
   - Get alerts for issues

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

## 📝 Notes

- **Never commit `.env.local`** - It's in `.gitignore`
- **Always test builds locally** before deploying
- **Keep dependencies updated** for security
- **Monitor build logs** for warnings
- **Set up staging environment** for testing before production

## 🆘 Support

If you encounter issues:
1. Check build logs in your deployment platform
2. Verify environment variables are set correctly
3. Test production build locally
4. Check Next.js and Sanity documentation

---

**Happy Deploying! 🚀**

