import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="bg-surface shadow-sm sticky top-0 z-50 hidden lg:block">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-reverse space-x-8">
            <a routerLink="/" class="text-2xl font-bold text-primary">FitLife</a>
            <div class="flex space-x-reverse space-x-6">
              <a routerLink="/" class="text-text-primary hover:text-primary font-medium">الرئيسية</a>
              <a routerLink="/marketplace" class="text-text-secondary hover:text-primary font-medium">السوق</a>
              <a routerLink="/booking" class="text-text-secondary hover:text-primary font-medium">الحجوزات</a>
              <a routerLink="/chat" class="text-text-secondary hover:text-primary font-medium">المساعد الذكي</a>
            </div>
          </div>
          <div class="flex items-center space-x-reverse space-x-4">
            <a routerLink="/auth/login" class="text-text-secondary hover:text-primary font-medium">تسجيل الدخول</a>
            <a routerLink="/auth/register" class="btn-primary">إنشاء حساب</a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}