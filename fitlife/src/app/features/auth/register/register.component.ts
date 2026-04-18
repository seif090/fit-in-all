import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <a routerLink="/" class="text-3xl font-bold text-primary">FitLife</a>
          <p class="text-text-secondary mt-2">إنشاء حساب جديد</p>
        </div>

        <div class="card">
          <form class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">الاسم الأول</label>
                <input type="text" class="input" placeholder="أحمد" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">الاسم الأخير</label>
                <input type="text" class="input" placeholder="محمد" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input type="email" class="input" placeholder="ahmed@example.com" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">رقم الهاتف</label>
              <input type="tel" class="input" placeholder="05xxxxxxxx" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">كلمة المرور</label>
              <input type="password" class="input" placeholder="********" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
              <input type="password" class="input" placeholder="********" />
            </div>

            <label class="flex items-start gap-2">
              <input type="checkbox" class="w-4 h-4 text-primary mt-1" />
              <span class="text-sm text-text-secondary">
                أوافق على <a class="text-primary">الشروط والأحكام</a> و<a class="text-primary">سياسة الخصوصية</a>
              </span>
            </label>

            <button type="submit" class="btn-primary w-full">إنشاء حساب</button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-text-secondary">
              لديك حساب بالفعل؟
              <a routerLink="/auth/login" class="text-primary hover:underline">تسجيل الدخول</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {}