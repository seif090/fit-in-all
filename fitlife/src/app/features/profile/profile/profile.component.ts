import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService, Subscription } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        @if (loading()) {
          <div class="flex justify-center py-12">
            <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        } @else {
          <!-- Profile Header -->
          <div class="card mb-6">
            <div class="flex flex-col sm:flex-row items-center gap-6">
              <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                <span class="text-white text-4xl font-bold">{{ user()?.name?.charAt(0) || 'ض' }}</span>
              </div>
              <div class="text-center sm:text-right flex-1">
                <h1 class="text-2xl font-bold">{{ user()?.name || 'ضيف' }}</h1>
                <p class="text-text-secondary">{{ user()?.email || 'email@example.com' }}</p>
                <p class="text-sm text-text-secondary">عضو منذ {{ user()?.createdAt | date:'MMMM yyyy' }}</p>
              </div>
              <button class="btn-secondary">تعديل الملف</button>
            </div>
          </div>

          <!-- Subscription Status -->
          <div class="card mb-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold">الاشتراك</h2>
              @if (activeSubscription()) {
                <span class="bg-success/10 text-success px-3 py-1 rounded-full text-sm">نشط</span>
              } @else {
                <span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">غير نشط</span>
              }
            </div>
            @if (activeSubscription()) {
              <div class="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <p class="font-medium">{{ activeSubscription()?.plan }}</p>
                  <p class="text-sm text-text-secondary">{{ activeSubscription()?.gymName }}</p>
                </div>
                <div class="text-left">
                  <p class="font-bold text-primary">{{ activeSubscription()?.price }} ر.س/شهر</p>
                  <p class="text-sm text-text-secondary">ينتهي {{ activeSubscription()?.endDate | date:'d MMM yyyy' }}</p>
                </div>
              </div>
              <button class="btn-primary w-full mt-4">تجديد الاشتراك</button>
            } @else {
              <div class="text-center py-4">
                <p class="text-text-secondary mb-4">ليس لديك اشتراك نشط</p>
                <a routerLink="/marketplace" class="btn-primary">تصفح الصالات</a>
              </div>
            }
          </div>

          <!-- Menu Items -->
          <div class="card">
            <div class="divide-y divide-border">
              <a routerLink="/dashboard" class="flex items-center justify-between py-4 hover:text-primary cursor-pointer">
                <div class="flex items-center gap-4">
                  <span class="text-2xl">📊</span>
                  <span class="font-medium">لوحة التحكم</span>
                </div>
                <span class="text-text-secondary">→</span>
              </a>
              <a routerLink="/booking" class="flex items-center justify-between py-4 hover:text-primary cursor-pointer">
                <div class="flex items-center gap-4">
                  <span class="text-2xl">📅</span>
                  <span class="font-medium">حجوزاتي</span>
                </div>
                <span class="text-text-secondary">→</span>
              </a>
              <a routerLink="/marketplace" class="flex items-center justify-between py-4 hover:text-primary cursor-pointer">
                <div class="flex items-center gap-4">
                  <span class="text-2xl">🛒</span>
                  <span class="font-medium">طلباتي</span>
                </div>
                <span class="text-text-secondary">→</span>
              </a>
              <a routerLink="/profile/settings" class="flex items-center justify-between py-4 hover:text-primary cursor-pointer">
                <div class="flex items-center gap-4">
                  <span class="text-2xl">⚙️</span>
                  <span class="font-medium">الإعدادات</span>
                </div>
                <span class="text-text-secondary">→</span>
              </a>
              <button class="flex items-center justify-between py-4 hover:text-primary w-full">
                <div class="flex items-center gap-4">
                  <span class="text-2xl">❓</span>
                  <span class="font-medium">المساعدة</span>
                </div>
                <span class="text-text-secondary">→</span>
              </button>
              <button (click)="logout()" class="flex items-center justify-between py-4 hover:text-error w-full">
                <div class="flex items-center gap-4">
                  <span class="text-2xl">🚪</span>
                  <span class="font-medium">تسجيل الخروج</span>
                </div>
                <span class="text-text-secondary">→</span>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  loading = signal(true);
  user = this.authService.user;
  subscriptions = signal<Subscription[]>([]);

  activeSubscription = () => this.subscriptions().find(s => s.status === 'active');

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}