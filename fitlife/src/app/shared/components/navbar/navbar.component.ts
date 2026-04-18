import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="bg-surface shadow-sm sticky top-0 z-50 hidden lg:block">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-8">
            <a routerLink="/" class="text-2xl font-bold text-primary">FitLife</a>
            <div class="flex gap-6">
              <a routerLink="/" routerLinkActive="text-primary" [routerLinkActiveOptions]="{exact: true}" 
                 class="text-text-secondary hover:text-primary font-medium">الرئيسية</a>
              <a routerLink="/marketplace" routerLinkActive="text-primary" 
                 class="text-text-secondary hover:text-primary font-medium">السوق</a>
              <a routerLink="/about" routerLinkActive="text-primary" 
                 class="text-text-secondary hover:text-primary font-medium">عن المنصة</a>
              <a routerLink="/help" routerLinkActive="text-primary" 
                 class="text-text-secondary hover:text-primary font-medium">المساعدة</a>
              @if (authService.isAuthenticated()) {
                <a routerLink="/booking" routerLinkActive="text-primary" 
                   class="text-text-secondary hover:text-primary font-medium">الحجوزات</a>
                <a routerLink="/chat" routerLinkActive="text-primary" 
                   class="text-text-secondary hover:text-primary font-medium">المساعد الذكي</a>
              }
            </div>
          </div>
          <div class="flex items-center gap-3">
            <!-- Search -->
            <a routerLink="/search" class="p-2 text-text-secondary hover:text-primary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </a>

            @if (authService.isAuthenticated()) {
              <!-- Notifications -->
              <a routerLink="/profile/notifications" class="p-2 text-text-secondary hover:text-primary relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                @if (notificationService.unreadCount() > 0) {
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center">
                    {{ notificationService.unreadCount() }}
                  </span>
                }
              </a>

              <!-- Cart -->
              <a routerLink="/cart" class="p-2 text-text-secondary hover:text-primary relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                @if (cartService.itemCount() > 0) {
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {{ cartService.itemCount() }}
                  </span>
                }
              </a>

              @if (authService.isAdmin()) {
                <a routerLink="/admin" class="text-text-secondary hover:text-primary font-medium">لوحة الإدارة</a>
              }
              <a routerLink="/dashboard" class="text-text-secondary hover:text-primary font-medium">لوحة التحكم</a>
              <a routerLink="/profile" class="text-text-secondary hover:text-primary font-medium">ملفي</a>
              <button (click)="logout()" class="text-text-secondary hover:text-error font-medium">تسجيل خروج</button>
            } @else {
              <a routerLink="/auth/login" class="text-text-secondary hover:text-primary font-medium">تسجيل الدخول</a>
              <a routerLink="/auth/register" class="btn-primary">إنشاء حساب</a>
            }
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  cartService = inject(CartService);

  logout() {
    this.authService.logout();
  }
}