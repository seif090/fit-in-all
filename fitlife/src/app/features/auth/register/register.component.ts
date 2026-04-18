import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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

        @if (error()) {
          <div class="bg-error/10 text-error p-4 rounded-lg mb-4 text-center">
            {{ error() }}
          </div>
        }

        <div class="card">
          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">الاسم الأول</label>
                <input type="text" [(ngModel)]="firstName" name="firstName" class="input" placeholder="أحمد" required />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">الاسم الأخير</label>
                <input type="text" [(ngModel)]="lastName" name="lastName" class="input" placeholder="محمد" required />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input type="email" [(ngModel)]="email" name="email" class="input" placeholder="ahmed@example.com" required />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">رقم الهاتف</label>
              <input type="tel" [(ngModel)]="phone" name="phone" class="input" placeholder="05xxxxxxxx" required />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">كلمة المرور</label>
              <input type="password" [(ngModel)]="password" name="password" class="input" placeholder="********" required minlength="6" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
              <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" class="input" placeholder="********" required />
            </div>

            <label class="flex items-start gap-2">
              <input type="checkbox" [(ngModel)]="agreeTerms" name="agreeTerms" class="w-4 h-4 text-primary mt-1" required />
              <span class="text-sm text-text-secondary">
                أوافق على <a class="text-primary">الشروط والأحكام</a> و<a class="text-primary">سياسة الخصوصية</a>
              </span>
            </label>

            <button type="submit" [disabled]="loading()" class="btn-primary w-full disabled:opacity-50">
              @if (loading()) {
                <span>جاري الإنشاء...</span>
              } @else {
                <span>إنشاء حساب</span>
              }
            </button>
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
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  agreeTerms = false;
  
  loading = signal(false);
  error = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.password) {
      this.error.set('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set('كلمات المرور غير متطابقة');
      return;
    }

    if (this.password.length < 6) {
      this.error.set('يجب أن تكون كلمة المرور 6 أحرف على الأقل');
      return;
    }

    if (!this.agreeTerms) {
      this.error.set('الرجاء الموافقة على الشروط والأحكام');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.register({
      name: `${this.firstName} ${this.lastName}`,
      email: this.email,
      phone: this.phone,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'فشل إنشاء الحساب. الرجاء المحاولة مرة أخرى');
      }
    });
  }
}