import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
      <div class="w-full max-w-md text-center">
        <div class="mb-8">
          <span class="text-8xl">🔍</span>
        </div>
        
        <h1 class="text-4xl font-bold text-text-primary mb-4">404</h1>
        
        <p class="text-xl text-text-secondary mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة
        </p>

        <div class="space-y-3">
          <a routerLink="/" class="btn-primary block">العودة للرئيسية</a>
          <a routerLink="/marketplace" class="btn-secondary block">تصفح السوق</a>
        </div>

        <div class="mt-12 card">
          <h2 class="text-lg font-semibold mb-4">روابط سريعة</h2>
          <div class="space-y-2 text-right">
            <a routerLink="/dashboard" class="block text-text-secondary hover:text-primary">لوحة التحكم</a>
            <a routerLink="/booking" class="block text-text-secondary hover:text-primary">الحجوزات</a>
            <a routerLink="/chat" class="block text-text-secondary hover:text-primary">المساعد الذكي</a>
            <a routerLink="/profile" class="block text-text-secondary hover:text-primary">ملفي</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {}