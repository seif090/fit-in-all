import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
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
              @if (authService.isAuthenticated()) {
                <a routerLink="/booking" routerLinkActive="text-primary" 
                   class="text-text-secondary hover:text-primary font-medium">الحجوزات</a>
                <a routerLink="/chat" routerLinkActive="text-primary" 
                   class="text-text-secondary hover:text-primary font-medium">المساعد الذكي</a>
              }
            </div>
          </div>
          <div class="flex items-center gap-4">
            @if (authService.isAuthenticated()) {
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

  logout() {
    this.authService.logout();
  }
}