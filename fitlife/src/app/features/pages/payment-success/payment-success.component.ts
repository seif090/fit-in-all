import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
      <div class="w-full max-w-md text-center">
        <div class="card py-12">
          <div class="w-24 h-24 bg-success/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span class="text-5xl text-success">✓</span>
          </div>
          
          <h1 class="text-3xl font-bold text-text-primary mb-4">تم الدفع بنجاح!</h1>
          
          <p class="text-text-secondary mb-8">
            شكراً لطلبك. we've sent a confirmation email with your order details.
          </p>

          <div class="bg-background rounded-lg p-4 mb-8">
            <p class="text-sm text-text-secondary">رقم الطلب</p>
            <p class="text-xl font-bold text-primary">{{ orderId }}</p>
          </div>

          <div class="space-y-3">
            <a routerLink="/profile/orders" class="btn-primary block">عرض طلباتي</a>
            <a routerLink="/marketplace" class="btn-secondary block">تصفح المزيد</a>
          </div>
        </div>

        <p class="text-sm text-text-secondary mt-6">
         有任何问题؟ <a routerLink="/help" class="text-primary hover:underline">تواصل معنا</a>
        </p>
      </div>
    </div>
  `
})
export class PaymentSuccessComponent {
  private router = inject(Router);
  
  orderId = '';

  constructor() {
    // Generate random order ID
    this.orderId = 'FL' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}