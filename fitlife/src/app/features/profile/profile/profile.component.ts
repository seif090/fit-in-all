import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Profile Header -->
        <div class="card mb-6">
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <span class="text-white text-4xl font-bold">أ</span>
            </div>
            <div class="text-center sm:text-right flex-1">
              <h1 class="text-2xl font-bold">أحمد محمد</h1>
              <p class="text-text-secondary">ahmed&#64;example.com</p>
              <p class="text-sm text-text-secondary">عضو منذ يناير 2026</p>
            </div>
            <button class="btn-secondary">تعديل الملف</button>
          </div>
        </div>

        <!-- Subscription Status -->
        <div class="card mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">الاشتراك</h2>
            <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">نشط</span>
          </div>
          <div class="flex items-center justify-between py-4 border-b border-border">
            <div>
              <p class="font-medium">الباقة الذهبية</p>
              <p class="text-sm text-text-secondary">صالة اللياقة الذهبية</p>
            </div>
            <div class="text-left">
              <p class="font-bold text-primary">299 ر.س/شهر</p>
              <p class="text-sm text-text-secondary">ينتهي 15 مايو 2026</p>
            </div>
          </div>
          <button class="btn-primary w-full mt-4">تجديد الاشتراك</button>
        </div>

        <!-- Menu Items -->
        <div class="card">
          <div class="divide-y divide-border">
            <a routerLink="/dashboard" class="flex items-center justify-between py-4 hover:text-primary">
              <div class="flex items-center gap-4">
                <span class="text-2xl">📊</span>
                <span class="font-medium">لوحة التحكم</span>
              </div>
              <span class="text-text-secondary">→</span>
            </a>
            <a routerLink="/booking" class="flex items-center justify-between py-4 hover:text-primary">
              <div class="flex items-center gap-4">
                <span class="text-2xl">📅</span>
                <span class="font-medium">حجوزاتي</span>
              </div>
              <span class="text-text-secondary">→</span>
            </a>
            <a routerLink="/marketplace" class="flex items-center justify-between py-4 hover:text-primary">
              <div class="flex items-center gap-4">
                <span class="text-2xl">🛒</span>
                <span class="font-medium">طلباتي</span>
              </div>
              <span class="text-text-secondary">→</span>
            </a>
            <a class="flex items-center justify-between py-4 hover:text-primary">
              <div class="flex items-center gap-4">
                <span class="text-2xl">⚙️</span>
                <span class="font-medium">الإعدادات</span>
              </div>
              <span class="text-text-secondary">→</span>
            </a>
            <a class="flex items-center justify-between py-4 hover:text-primary">
              <div class="flex items-center gap-4">
                <span class="text-2xl">❓</span>
                <span class="font-medium">المساعدة</span>
              </div>
              <span class="text-text-secondary">→</span>
            </a>
            <a class="flex items-center justify-between py-4 hover:text-error">
              <div class="flex items-center gap-4">
                <span class="text-2xl">🚪</span>
                <span class="font-medium">تسجيل الخروج</span>
              </div>
              <span class="text-text-secondary">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {}