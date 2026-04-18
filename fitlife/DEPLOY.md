# FitLife - Fitness & Health Platform

Angular 18+ application ready for deployment on Vercel.

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Vercel will auto-detect Angular and deploy

### Option 3: Vercel Dashboard
1. Go to https://vercel.com
2. Create new project
3. Connect to your Git repo or upload the `fitlife` folder
4. Settings:
   - Framework: Angular
   - Build Command: `ng build --configuration=production`
   - Output Directory: `dist/fitlife/browser`

## Project Structure
```
fitlife/
├── src/app/
│   ├── core/          # Services, guards, interceptors
│   ├── shared/       # Components (navbar, footer, bottom-nav)
│   └── features/      # Pages (auth, dashboard, marketplace, etc.)
├── dist/fitlife/browser/  # Production build
└── vercel.json        # Vercel config
```

## Features
- Marketplace landing page
- User dashboard with stats
- Booking system
- AI chat assistant
- Shopping cart & checkout
- User profile management
- Admin dashboard
- RTL support (Arabic)
- Responsive design

## Tech Stack
- Angular 18
- TypeScript
- Tailwind CSS
- RxJS
- Standalone Components
- Lazy Loading

## API Configuration
Update `src/environments/environment.ts` to point to your backend API:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api.vercel.app/api'
};
```