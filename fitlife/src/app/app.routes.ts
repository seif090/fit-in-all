import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/marketplace/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'help',
    loadComponent: () => import('./features/pages/help/help.component').then(m => m.HelpComponent)
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./features/marketplace/marketplace/marketplace.component').then(m => m.MarketplaceComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./features/marketplace/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/marketplace/cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard]
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard]
  },
  {
    path: 'payment-success',
    loadComponent: () => import('./features/pages/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent),
    canActivate: [authGuard]
  },
  {
    path: 'gym/:id',
    loadComponent: () => import('./features/marketplace/gym-details/gym-details.component').then(m => m.GymDetailsComponent)
  },
  {
    path: 'coach/:id',
    loadComponent: () => import('./features/marketplace/coach-details/coach-details.component').then(m => m.CoachDetailsComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./features/marketplace/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/booking/booking.component').then(m => m.BookingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'chat',
    loadComponent: () => import('./features/chat/chat/chat.component').then(m => m.ChatComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile/orders',
    loadComponent: () => import('./features/profile/orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile/settings',
    loadComponent: () => import('./features/profile/settings/settings.component').then(m => m.SettingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile/notifications',
    loadComponent: () => import('./features/profile/notifications/notifications.component').then(m => m.NotificationsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'auth/forgot-password',
    loadComponent: () => import('./features/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];