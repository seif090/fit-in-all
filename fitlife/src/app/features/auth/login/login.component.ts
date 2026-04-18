import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <a routerLink="/" class="text-3xl font-bold text-primary">FitLife</a>
          <p class="text-text-secondary mt-2">تسجيل الدخول إلى حسابك</p>
        </div>

        <div class="card">
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input type="email" class="input" placeholder="أدخل بريدك الإلكتروني" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">كلمة المرور</label>
              <input type="password" class="input" placeholder="أدخل كلمة المرور" />
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2">
                <input type="checkbox" class="w-4 h-4 text-primary" />
                <span class="text-sm">تذكرني</span>
              </label>
              <a class="text-sm text-primary hover:underline">نسيت كلمة المرور؟</a>
            </div>

            <button type="submit" class="btn-primary w-full">تسجيل الدخول</button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-text-secondary">
              ليس لديك حساب؟
              <a routerLink="/auth/register" class="text-primary hover:underline">إنشاء حساب</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {}