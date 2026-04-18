import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-text-primary mb-2">مرحباً، أحمد</h1>
        <p class="text-text-secondary mb-8">إليك ملخص يومك</p>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <span class="text-text-secondary">الوزن</span>
              <span class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">⚖️</span>
            </div>
            <div class="text-3xl font-bold">75 <span class="text-lg font-normal">كجم</span></div>
            <div class="text-sm text-success mt-2">-2 كجم هذا الشهر</div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <span class="text-text-secondary">السعرات</span>
              <span class="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">🔥</span>
            </div>
            <div class="text-3xl font-bold">1,850 <span class="text-lg font-normal">سعرة</span></div>
            <div class="text-sm text-text-secondary mt-2">المتبقي: 650 سعرة</div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <span class="text-text-secondary">الهدف</span>
              <span class="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">🎯</span>
            </div>
            <div class="text-3xl font-bold">65%</div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div class="bg-accent h-2 rounded-full" style="width: 65%"></div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <a routerLink="/marketplace" class="card flex items-center gap-4 hover:border-2 border-primary">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">🏋️</div>
            <div>
              <h3 class="font-semibold">ابدأ تمرين</h3>
              <p class="text-sm text-text-secondary">اختر برنامجك</p>
            </div>
          </a>
          <a routerLink="/booking" class="card flex items-center gap-4 hover:border-2 border-primary">
            <div class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-2xl">📅</div>
            <div>
              <h3 class="font-semibold">احجز جلسة</h3>
              <p class="text-sm text-text-secondary">مع مدرب或个人</p>
            </div>
          </a>
          <a routerLink="/marketplace" class="card flex items-center gap-4 hover:border-2 border-primary">
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-2xl">💊</div>
            <div>
              <h3 class="font-semibold">اطلب مكملات</h3>
              <p class="text-sm text-text-secondary">منتجات nutrition</p>
            </div>
          </a>
        </div>

        <!-- AI Recommendations -->
        <div class="card mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold">توصيات الذكاء الاصطناعي</h2>
            <span class="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-sm">🤖 ذكاء اصطناعي</span>
          </div>
          <div class="space-y-4">
            <div class="flex items-start gap-4 p-4 bg-background rounded-lg">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">💡</div>
              <div>
                <h4 class="font-semibold mb-1">زيادة وقت cardio</h4>
                <p class="text-sm text-text-secondary">بناءً على أهدافك، نوصي بزيادة cardio إلى 30 دقيقة يومياً</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-background rounded-lg">
              <div class="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">🥗</div>
              <div>
                <h4 class="font-semibold mb-1">تعديل الخطة الغذائية</h4>
                <p class="text-sm text-text-secondary">استهلك 500 سعرة أقل للوصول للهدف الأسبوعي</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-background rounded-lg">
              <div class="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">💪</div>
              <div>
                <h4 class="font-semibold mb-1">تمرين القوة</h4>
                <p class="text-sm text-text-secondary">حان وقت جلسة رفع أثقال! فكر في حجز مع مدرب</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">النشاط الأخير</h2>
          <div class="space-y-4">
            @for (activity of recentActivities; track activity.id) {
              <div class="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div class="flex items-center gap-4">
                  <span class="text-2xl">{{activity.icon}}</span>
                  <div>
                    <h4 class="font-medium">{{activity.title}}</h4>
                    <p class="text-sm text-text-secondary">{{activity.time}}</p>
                  </div>
                </div>
                <span class="text-primary font-medium">{{activity.value}}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  recentActivities = [
    { id: 1, icon: '🏋️', title: 'تمارين قوة', time: 'منذ ساعتين', value: '45 دقيقة' },
    { id: 2, icon: '🥗', title: 'وجبة غداء', time: 'منذ 4 ساعات', value: '650 سعرة' },
    { id: 3, icon: '💧', title: 'شرب ماء', time: 'منذ 5 ساعات', value: '2.5 لتر' },
    { id: 4, icon: '😴', title: 'نوم', time: 'منذ 8 ساعات', value: '7 ساعات' },
  ];
}