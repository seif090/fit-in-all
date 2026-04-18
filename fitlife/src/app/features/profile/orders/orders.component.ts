import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService, Order } from '../../../core/services/user.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 mb-8">
          <a routerLink="/profile" class="text-primary hover:underline">← العودة</a>
          <h1 class="text-3xl font-bold text-text-primary">طلباتي</h1>
        </div>

        @if (loading()) {
          <div class="flex justify-center py-12">
            <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        } @else {
          @if (orders().length === 0) {
            <div class="card text-center py-12">
              <div class="text-6xl mb-4">📦</div>
              <h2 class="text-xl font-semibold mb-2">لا توجد طلبات</h2>
              <p class="text-text-secondary mb-6">لم تقم بأي طلبات بعد</p>
              <a routerLink="/marketplace" class="btn-primary">تصفح السوق</a>
            </div>
          } @else {
            <div class="space-y-4">
              @for (order of orders(); track order.id) {
                <div class="card">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <p class="font-semibold">طلب #{{ order.id.slice(-8) }}</p>
                      <p class="text-sm text-text-secondary">{{ order.createdAt | date:'d MMMM yyyy' }}</p>
                    </div>
                    <span [class]="getStatusClass(order.status)">
                      {{ getStatusText(order.status) }}
                    </span>
                  </div>
                  
                  <div class="border-t border-b border-border py-4">
                    @for (item of order.products; track item.productId) {
                      <div class="flex justify-between py-2">
                        <span class="text-text-secondary">{{ item.name }} × {{ item.quantity }}</span>
                        <span class="font-medium">{{ item.price }} ر.س</span>
                      </div>
                    }
                  </div>
                  
                  <div class="flex justify-between items-center pt-4">
                    <span class="text-lg font-bold">الإجمالي</span>
                    <span class="text-xl font-bold text-primary">{{ order.total }} ر.س</span>
                  </div>
                </div>
              }
            </div>
          }
        }
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  private userService = inject(UserService);
  
  loading = signal(true);
  orders = signal<Order[]>([]);

  ngOnInit() {
    this.userService.getOrders().subscribe({
      next: (data) => {
        this.orders.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'delivered': return 'bg-success/10 text-success px-3 py-1 rounded-full text-sm';
      case 'processing': return 'bg-accent/10 text-accent px-3 py-1 rounded-full text-sm';
      case 'pending': return 'bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm';
      case 'cancelled': return 'bg-error/10 text-error px-3 py-1 rounded-full text-sm';
      default: return 'bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'delivered': return 'تم التوصيل';
      case 'processing': return 'قيد التجهيز';
      case 'pending': return 'قيد الانتظار';
      case 'cancelled': return 'ملغى';
      default: return status;
    }
  }
}