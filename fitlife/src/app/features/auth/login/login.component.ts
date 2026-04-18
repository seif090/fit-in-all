import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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

        @if (error()) {
          <div class="bg-error/10 text-error p-4 rounded-lg mb-4 text-center">
            {{ error() }}
          </div>
        }

        <div class="card">
          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input type="email" [(ngModel)]="email" name="email" class="input" 
                     placeholder="أدخل بريدك الإلكتروني" required />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">كلمة المرور</label>
              <input type="password" [(ngModel)]="password" name="password" class="input" 
                     placeholder="أدخل كلمة المرور" required />
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2">
                <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe" class="w-4 h-4 text-primary" />
                <span class="text-sm">تذكرني</span>
              </label>
              <a class="text-sm text-primary hover:underline">نسيت كلمة المرور؟</a>
            </div>

            <button type="submit" [disabled]="loading()" class="btn-primary w-full disabled:opacity-50">
              @if (loading()) {
                <span>جاري التحميل...</span>
              } @else {
                <span>تسجيل الدخول</span>
              }
            </button>
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
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  
  loading = signal(false);
  error = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error.set('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'فشل تسجيل الدخول. الرجاء المحاولة مرة أخرى');
      }
    });
  }
}