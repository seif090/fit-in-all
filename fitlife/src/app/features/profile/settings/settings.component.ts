import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 mb-8">
          <a routerLink="/profile" class="text-primary">← العودة</a>
          <h1 class="text-3xl font-bold text-text-primary">الإعدادات</h1>
        </div>

        <!-- Profile Section -->
        <div class="card mb-6">
          <h2 class="text-xl font-semibold mb-4">معلومات الحساب</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">الاسم</label>
              <input type="text" [(ngModel)]="name" class="input" />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input type="email" [(ngModel)]="email" class="input" disabled />
              <p class="text-xs text-text-secondary mt-1">لا يمكن تغيير البريد الإلكتروني</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">رقم الهاتف</label>
              <input type="tel" [(ngModel)]="phone" class="input" />
            </div>

            <button (click)="saveProfile()" [disabled]="saving()" class="btn-primary">
              @if (saving()) {
                جاري الحفظ...
              } @else {
                حفظ التغييرات
              }
            </button>
          </div>
        </div>

        <!-- Preferences -->
        <div class="card mb-6">
          <h2 class="text-xl font-semibold mb-4">التفضيلات</h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">الإشعارات</p>
                <p class="text-sm text-text-secondary">استقبال إشعارات_push</p>
              </div>
              <button [class]="notifications ? 'bg-primary' : 'bg-gray-200'" 
                      (click)="notifications = !notifications"
                      class="relative w-12 h-6 rounded-full transition-colors">
                <span [class]="notifications ? 'translate-x-6' : 'translate-x-1'" 
                      class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">الرسائل البريدية</p>
                <p class="text-sm text-text-secondary">استقبال رسائل عبر البريد</p>
              </div>
              <button [class]="emailNotifications ? 'bg-primary' : 'bg-gray-200'" 
                      (click)="emailNotifications = !emailNotifications"
                      class="relative w-12 h-6 rounded-full transition-colors">
                <span [class]="emailNotifications ? 'translate-x-6' : 'translate-x-1'" 
                      class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">الوضع الليلي</p>
                <p class="text-sm text-text-secondary">تفعيل الوضع الداكن</p>
              </div>
              <button [class]="darkMode ? 'bg-primary' : 'bg-gray-200'" 
                      (click)="darkMode = !darkMode"
                      class="relative w-12 h-6 rounded-full transition-colors">
                <span [class]="darkMode ? 'translate-x-6' : 'translate-x-1'" 
                      class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Language -->
        <div class="card mb-6">
          <h2 class="text-xl font-semibold mb-4">اللغة</h2>
          
          <div class="space-y-2">
            <button (click)="language = 'ar'" 
                    [class]="language === 'ar' ? 'border-2 border-primary bg-primary/5' : 'border border-border'"
                    class="w-full p-4 rounded-lg flex items-center justify-between cursor-pointer">
              <span class="font-medium">العربية</span>
              @if (language === 'ar') {
                <span class="text-primary">✓</span>
              }
            </button>
            <button (click)="language = 'en'" 
                    [class]="language === 'en' ? 'border-2 border-primary bg-primary/5' : 'border border-border'"
                    class="w-full p-4 rounded-lg flex items-center justify-between cursor-pointer">
              <span class="font-medium">English</span>
              @if (language === 'en') {
                <span class="text-primary">✓</span>
              }
            </button>
          </div>
        </div>

        <!-- Security -->
        <div class="card mb-6">
          <h2 class="text-xl font-semibold mb-4">الأمان</h2>
          
          <div class="space-y-4">
            <button class="w-full p-4 rounded-lg border border-border flex items-center justify-between cursor-pointer hover:border-primary">
              <span class="font-medium">تغيير كلمة المرور</span>
              <span class="text-text-secondary">→</span>
            </button>
            
            <button class="w-full p-4 rounded-lg border border-border flex items-center justify-between cursor-pointer hover:border-primary">
              <span class="font-medium">تثبيت التحقق الثنائي</span>
              <span class="text-text-secondary">→</span>
            </button>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="card border-error/20">
          <h2 class="text-xl font-semibold mb-4 text-error">منطقة الخطر</h2>
          
          <button (click)="deleteAccount()" class="w-full p-4 rounded-lg border border-error text-error flex items-center justify-center cursor-pointer hover:bg-error/5">
            حذف الحساب
          </button>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent {
  private authService = inject(AuthService);
  
  user = this.authService.user;
  
  name = this.user()?.name || '';
  email = this.user()?.email || '';
  phone = this.user()?.phone || '';
  
  notifications = true;
  emailNotifications = true;
  darkMode = false;
  language = 'ar';
  
  saving = signal(false);

  saveProfile() {
    this.saving.set(true);
    this.authService.updateProfile({ name: this.name, phone: this.phone }).subscribe({
      next: () => {
        this.saving.set(false);
        alert('تم حفظ التغييرات بنجاح');
      },
      error: () => {
        this.saving.set(false);
        alert('فشل حفظ التغييرات');
      }
    });
  }

  deleteAccount() {
    if (confirm('هل أنت متأكد من حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء.')) {
      alert('سيتم حذف الحساب - اتصل بالدعم');
    }
  }
}