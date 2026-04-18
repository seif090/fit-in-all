import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-text-primary">لوحة الإدارة</h1>
          <button class="btn-primary">تصدير تقرير</button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <span class="text-text-secondary">إجمالي المستخدمين</span>
              <span class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">👥</span>
            </div>
            <div class="text-3xl font-bold">2,456</div>
            <div class="text-sm text-success mt-2">+12% هذا الشهر</div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <span class="text-text-secondary">اشتراكات نشطة</span>
              <span class="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">✓</span>
            </div>
            <div class="text-3xl font-bold">1,890</div>
            <div class="text-sm text-success mt-2">+8% هذا الشهر</div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <span class="text-text-secondary">الإيرادات</span>
              <span class="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">💰</span>
            </div>
            <div class="text-3xl font-bold">156,000 ر.س</div>
            <div class="text-sm text-success mt-2">+15% هذا الشهر</div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <span class="text-text-secondary">الحجوزات</span>
              <span class="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center text-error">📅</span>
            </div>
            <div class="text-3xl font-bold">456</div>
            <div class="text-sm text-success mt-2">+5% هذا الشهر</div>
          </div>
        </div>

        <!-- Charts Placeholder -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div class="card">
            <h2 class="text-xl font-semibold mb-4">إحصائيات الإيرادات</h2>
            <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p class="text-text-secondary">مخطط الإيرادات الشهري</p>
            </div>
          </div>

          <div class="card">
            <h2 class="text-xl font-semibold mb-4">نمو المستخدمين</h2>
            <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p class="text-text-secondary">مخطط نمو المستخدمين</p>
            </div>
          </div>
        </div>

        <!-- Tables -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Users -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold">أحدث المستخدمين</h2>
              <a class="text-primary text-sm hover:underline">عرض الكل</a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-right text-sm text-text-secondary">
                    <th class="pb-3 font-medium">الاسم</th>
                    <th class="pb-3 font-medium">البريد</th>
                    <th class="pb-3 font-medium">التاريخ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  @for (user of recentUsers; track user.name) {
                    <tr>
                      <td class="py-3 font-medium">{{user.name}}</td>
                      <td class="py-3 text-text-secondary">{{user.email}}</td>
                      <td class="py-3 text-text-secondary">{{user.date}}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold">أحدث الطلبات</h2>
              <a class="text-primary text-sm hover:underline">عرض الكل</a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-right text-sm text-text-secondary">
                    <th class="pb-3 font-medium">المنتج</th>
                    <th class="pb-3 font-medium">الحالة</th>
                    <th class="pb-3 font-medium">السعر</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  @for (order of recentOrders; track order.product) {
                    <tr>
                      <td class="py-3 font-medium">{{order.product}}</td>
                      <td class="py-3">
                        <span [class]="order.status === 'مكتمل' ? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'" 
                              class="px-2 py-1 rounded-full text-xs">
                          {{order.status}}
                        </span>
                      </td>
                      <td class="py-3 text-text-secondary">{{order.price}}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {
  recentUsers = [
    { name: 'أحمد محمد', email: 'ahmed@example.com', date: '18 أبريل' },
    { name: 'سارة علي', email: 'sara@example.com', date: '17 أبريل' },
    { name: 'خالد عمر', email: 'khaled@example.com', date: '16 أبريل' },
    { name: 'فاطمة حسن', email: 'fatima@example.com', date: '15 أبريل' },
    { name: 'علي محمد', email: 'ali@example.com', date: '14 أبريل' },
  ];

  recentOrders = [
    { product: 'بروتين واي', status: 'مكتمل', price: '189 ر.س' },
    { product: 'اشتراك صالة', status: 'مكتمل', price: '299 ر.س' },
    { product: 'كرياتين', status: 'قيد التوصيل', price: '99 ر.س' },
    { product: 'جلسة تدريب', status: 'مكتمل', price: '200 ر.س' },
    { product: 'مولتيب فيتامن', status: 'قيد التوصيل', price: '149 ر.س' },
  ];
}