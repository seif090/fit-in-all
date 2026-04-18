import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-text-primary mb-8">سلة المشتريات</h1>

        @if (cartService.items().length === 0) {
          <div class="card text-center py-12">
            <div class="text-6xl mb-4">🛒</div>
            <h2 class="text-xl font-semibold mb-2">سلة المشتريات فارغة</h2>
            <p class="text-text-secondary mb-6">ابدأ التسوق لإضافة منتجات إلى سلتك</p>
            <a routerLink="/marketplace" class="btn-primary">تصفح السوق</a>
          </div>
        } @else {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Cart Items -->
            <div class="lg:col-span-2 space-y-4">
              @for (item of cartService.items(); track item.id) {
                <div class="card flex gap-4">
                  <div class="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                    <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold mb-1">{{item.name}}</h3>
                    <p class="text-primary font-bold">{{item.price}} ر.س</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <button (click)="cartService.updateQuantity(item.id, item.quantity - 1)" 
                            class="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-background">-</button>
                    <span class="font-semibold">{{item.quantity}}</span>
                    <button (click)="cartService.updateQuantity(item.id, item.quantity + 1)" 
                            class="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-background">+</button>
                  </div>
                  <button (click)="cartService.removeItem(item.id)" class="text-error hover:text-error/80">
                    <span class="text-2xl">🗑️</span>
                  </button>
                </div>
              }
            </div>

            <!-- Summary -->
            <div>
              <div class="card sticky top-24">
                <h2 class="text-xl font-semibold mb-4">ملخص الطلب</h2>
                
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between">
                    <span class="text-text-secondary">عدد المنتجات</span>
                    <span class="font-medium">{{cartService.itemCount()}}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary">المجموع</span>
                    <span class="font-medium">{{cartService.total()}} ر.س</span>
                  </div>
                </div>

                <button (click)="checkout()" [disabled]="checkingOut" class="btn-primary w-full py-3 disabled:opacity-50">
                  @if (checkingOut) {
                    جاري المعالجة...
                  } @else {
                    إتمام الطلب
                  }
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CartComponent {
  cartService = inject(CartService);
  checkingOut = false;

  checkout() {
    this.checkingOut = true;
    this.cartService.checkout().subscribe({
      next: () => {
        this.cartService.clearCart();
        this.checkingOut = false;
        alert('تم تقديم الطلب بنجاح!');
      },
      error: () => {
        this.checkingOut = false;
        alert('فشل تقديم الطلب. الرجاء المحاولة مرة أخرى');
      }
    });
  }
}