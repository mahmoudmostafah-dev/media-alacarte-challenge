# Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ LTS
- npm 9+
- Git

### Installation & Running

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd media-app

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open in browser
# Navigate to http://localhost:4200
```

The app will auto-reload when you make code changes.

## 🔧 Development Commands

```bash
# Start dev server
npm start

# Run tests
npm test

# Build for production
npm run build

# Watch mode (compile on file change)
npm run watch

# Run Server-Side Rendering
npm run serve:ssr:media-app

# Generate new component
ng generate component feature/my-component
ng g c feature/my-component  # shorthand
```

## 📦 Build & Production

### Production Build
```bash
npm run build
```

Output will be in `dist/media-app/`

### Optimized Build
```bash
ng build --configuration production --optimization
```

**Build Optimizations**:
- Ahead-of-time (AOT) compilation
- Minification
- Tree-shaking
- Source map generation
- Bundle analysis

### Build Artifacts
```
dist/media-app/
├── index.html           # Main HTML file
├── styles.css           # Global styles (hashed)
├── main.*.js            # Main bundle
├── polyfills.*.js       # Polyfills
└── public/              # Static assets
```

## 🌐 Deployment Options

### 1. **GitHub Pages** (Free, Static)

```bash
# Install angular-cli-ghpages
npm install -g angular-cli-ghpages

# Build and deploy
ng build --configuration production --base-href="/media-app/"
ngh --dir=dist/media-app

# Your site will be at: https://yourusername.github.io/media-app
```

### 2. **Netlify** (Recommended, Free with CMS)

**Option A: Using Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist/media-app
```

**Option B: Git Auto-Deploy**
1. Push code to GitHub
2. Connect repo to Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `dist/media-app`
5. Deploy on every push

### 3. **Vercel** (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**vercel.json** configuration:
```json
{
  "buildCommand": "ng build --configuration production",
  "outputDirectory": "dist/media-app",
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```

### 4. **Docker Containerization**

Create `Dockerfile`:
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY --from=builder /app/dist/media-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t media-app .
docker run -p 80:80 media-app
```

### 5. **Azure App Service**

```bash
# Build
npm run build

# Deploy using Azure CLI
az webapp deployment source config-zip --resource-group myResourceGroup --name myApp --src dist/media-app
```

## ⚙️ Environment Configuration

### Development Environment
File: `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  logLevel: 'debug'
};
```

### Production Environment
File: `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.media-alacarte.com',
  logLevel: 'error'
};
```

### Using Environment Variables
```typescript
import { environment } from '../environments/environment';

export class AppComponent {
  apiUrl = environment.apiUrl;
  isProduction = environment.production;
}
```

## 🧪 Testing

### Run Unit Tests
```bash
npm test
```

### Run with Coverage
```bash
ng test --code-coverage
```

### Coverage Reports
Output in `coverage/` directory - open `coverage/index.html` in browser

## 📊 Performance Analysis

### Build Analysis
```bash
ng build --stats-json
webpack-bundle-analyzer dist/media-app/stats.json
```

### Runtime Performance
1. Open DevTools → Performance tab
2. Click Record, interact with app
3. Stop and analyze results
4. Check Lighthouse scores (DevTools → Lighthouse)

## 🐛 Debugging

### Browser DevTools
1. Open DevTools (F12)
2. Sources tab for TypeScript debugging
3. Set breakpoints
4. Inspect variables and call stack

### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## 🔍 Code Quality

### Run Linting
```bash
ng lint
```

### Format Code
```bash
npx prettier --write src/
```

## 📱 Progressive Web App (PWA)

To add PWA features:
```bash
ng add @angular/pwa
```

This adds:
- Service Worker
- Web manifest
- Icons and splash screens
- Offline support

## 🚨 Environment Variables (Secrets)

**Never commit secrets!** Use environment variables:

```bash
# .env file (add to .gitignore)
API_KEY=your-secret-key
```

Access in code:
```typescript
const apiKey = process.env['API_KEY'];
```

## 📋 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## ✅ Pre-deployment Checklist

- [ ] All tests passing (`npm test`)
- [ ] No console errors or warnings
- [ ] Build succeeds (`npm run build`)
- [ ] Production build tested locally
- [ ] Environment variables configured
- [ ] API endpoints verified
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] Accessibility checked (axe DevTools)
- [ ] Security headers configured
- [ ] Analytics/tracking configured
- [ ] Error tracking (Sentry) configured
- [ ] Backup & rollback plan ready

## 🔄 Rollback Procedure

If deployment fails:
1. Identify issue from error logs
2. Revert to last stable commit
3. Fix issue locally
4. Test thoroughly
5. Redeploy

```bash
# Rollback to previous version
git revert HEAD
git push
```

## 📞 Support & Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 4200
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Or use different port
ng serve --port 4201
```

### Dependencies Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
```bash
# Clean build
rm -rf dist/
ng build
```

## 📚 Additional Resources

- [Angular Deployment](https://angular.io/guide/deployment)
- [Netlify Deploy](https://www.netlify.com/blog/2019/09/23/angular-at-the-edge/)
- [Vercel Deploy](https://vercel.com/docs/frameworks/angular)
- [GitHub Pages Deploy](https://pages.github.com/)

---

**Last Updated**: April 27, 2026
**Angular**: 21.2.0
**Node**: 18+ LTS
