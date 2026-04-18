import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/marketplace/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./features/marketplace/marketplace/marketplace.component').then(m => m.MarketplaceComponent)
  },
  {
    path: 'gym/:id',
    loadComponent: () => import('./features/marketplace/gym-details/gym-details.component').then(m => m.GymDetailsComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/marketplace/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'chat',
    loadComponent: () => import('./features/chat/chat/chat.component').then(m => m.ChatComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];