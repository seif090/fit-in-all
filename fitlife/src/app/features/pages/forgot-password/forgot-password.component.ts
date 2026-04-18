import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <a routerLink="/" class="text-3xl font-bold text-primary">FitLife</a>
          <p class="text-text-secondary mt-2">استعادة كلمة المرور</p>
        </div>

        @if (step() === 'email') {
          <div class="card">
            <p class="text-text-secondary mb-6">
              أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
            </p>
            
            @if (error()) {
              <div class="bg-error/10 text-error p-4 rounded-lg mb-4 text-center">
                {{ error() }}
              </div>
            }
            
            <form (ngSubmit)="sendResetLink()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                <input type="email" [(ngModel)]="email" name="email" class="input" 
                       placeholder="أدخل بريدك الإلكتروني" required />
              </div>

              <button type="submit" [disabled]="loading()" class="btn-primary w-full disabled:opacity-50">
                @if (loading()) {
                  <span>جاري الإرسال...</span>
                } @else {
                  <span>إرسال رابط الاستعادة</span>
                }
              </button>
            </form>

            <div class="mt-6 text-center">
              <a routerLink="/auth/login" class="text-primary hover:underline">العودة لتسجيل الدخول</a>
            </div>
          </div>
        } @else if (step() === 'success') {
          <div class="card text-center">
            <div class="text-6xl mb-4">✓</div>
            <h2 class="text-xl font-semibold mb-2">تم الإرسال!</h2>
            <p class="text-text-secondary mb-6">
              لقد أرسلنا رابط استعادة كلمة المرور إلى بريدك الإلكتروني. 
              يرجى التحقق من صندوق الوارد (أو الرسائل غير المرغوب فيها).
            </p>
            <a routerLink="/auth/login" class="btn-primary">العودة لتسجيل الدخول</a>
          </div>
        }
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  email = '';
  step = signal<'email' | 'success'>('email');
  loading = signal(false);
  error = signal('');

  sendResetLink() {
    if (!this.email) {
      this.error.set('الرجاء إدخال البريد الإلكتروني');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    // Simulate API call
    setTimeout(() => {
      this.loading.set(false);
      this.step.set('success');
    }, 1500);
  }
}