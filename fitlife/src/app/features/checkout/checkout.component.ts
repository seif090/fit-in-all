import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-text-primary mb-8">الدفع</h1>

        @if (cart.items().length === 0) {
          <div class="card text-center py-12">
            <div class="text-6xl mb-4">🛒</div>
            <h2 class="text-xl font-semibold mb-2">سلتك فارغة</h2>
            <a routerLink="/marketplace" class="btn-primary">تصفح السوق</a>
          </div>
        } @else {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Payment Form -->
            <div class="space-y-6">
              <!-- Shipping Info -->
              <div class="card">
                <h2 class="text-xl font-semibold mb-4">معلومات الشحن</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">الاسم الكامل</label>
                    <input type="text" [(ngModel)]="shippingInfo.name" class="input" placeholder="أحمد محمد" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">رقم الهاتف</label>
                    <input type="tel" [(ngModel)]="shippingInfo.phone" class="input" placeholder="05xxxxxxxx" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">العنوان</label>
                    <input type="text" [(ngModel)]="shippingInfo.address" class="input" placeholder="الحي - الشارع - المبنى" />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">المدينة</label>
                      <input type="text" [(ngModel)]="shippingInfo.city" class="input" placeholder="الرياض" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">الرمز البريدي</label>
                      <input type="text" [(ngModel)]="shippingInfo.zip" class="input" placeholder="xxxxx" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Payment Method -->
              <div class="card">
                <h2 class="text-xl font-semibold mb-4">طريقة الدفع</h2>
                <div class="space-y-3">
                  <label [class]="paymentMethod === 'card' ? 'border-2 border-primary bg-primary/5' : 'border border-border'"
                         class="flex items-center gap-4 p-4 rounded-lg cursor-pointer">
                    <input type="radio" name="payment" value="card" [(ngModel)]="paymentMethod" class="hidden" />
                    <div class="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs">VISA</div>
                    <div class="flex-1">
                      <p class="font-medium">بطاقة ائتمان</p>
                      <p class="text-sm text-text-secondary">Visa, Mastercard, Mada</p>
                    </div>
                    @if (paymentMethod === 'card') {
                      <span class="text-primary">✓</span>
                    }
                  </label>

                  <label [class]="paymentMethod === 'apple' ? 'border-2 border-primary bg-primary/5' : 'border border-border'"
                         class="flex items-center gap-4 p-4 rounded-lg cursor-pointer">
                    <input type="radio" name="payment" value="apple" [(ngModel)]="paymentMethod" class="hidden" />
                    <div class="w-12 h-8 bg-black rounded flex items-center justify-center text-white"></div>
                    <div class="flex-1">
                      <p class="font-medium">Apple Pay</p>
                      <p class="text-sm text-text-secondary">الدفع السريع</p>
                    </div>
                    @if (paymentMethod === 'apple') {
                      <span class="text-primary">✓</span>
                    }
                  </label>

                  <label [class]="paymentMethod === 'cod' ? 'border-2 border-primary bg-primary/5' : 'border border-border'"
                         class="flex items-center gap-4 p-4 rounded-lg cursor-pointer">
                    <input type="radio" name="payment" value="cod" [(ngModel)]="paymentMethod" class="hidden" />
                    <div class="text-2xl">💵</div>
                    <div class="flex-1">
                      <p class="font-medium">الدفع عند الاستلام</p>
                      <p class="text-sm text-text-secondary">ادفع عند وصول الطلب</p>
                    </div>
                    @if (paymentMethod === 'cod') {
                      <span class="text-primary">✓</span>
                    }
                  </label>
                </div>

                @if (paymentMethod === 'card') {
                  <div class="mt-4 space-y-4 pt-4 border-t border-border">
                    <div>
                      <label class="block text-sm font-medium mb-2">رقم البطاقة</label>
                      <input type="text" [(ngModel)]="cardInfo.number" class="input" placeholder="xxxx xxxx xxxx xxxx" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium mb-2">تاريخ الانتهاء</label>
                        <input type="text" [(ngModel)]="cardInfo.expiry" class="input" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-2">CVV</label>
                        <input type="text" [(ngModel)]="cardInfo.cvv" class="input" placeholder="xxx" />
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Order Summary -->
            <div>
              <div class="card sticky top-24">
                <h2 class="text-xl font-semibold mb-4">ملخص الطلب</h2>
                
                <div class="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  @for (item of cart.items(); track item.id) {
                    <div class="flex gap-3">
                      <div class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                        <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover" />
                      </div>
                      <div class="flex-1">
                        <p class="font-medium text-sm">{{ item.name }}</p>
                        <p class="text-xs text-text-secondary">الكمية: {{ item.quantity }}</p>
                      </div>
                      <p class="font-medium">{{ item.price * item.quantity }} ر.س</p>
                    </div>
                  }
                </div>

                <div class="border-t border-b border-border py-4 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-text-secondary">المجموع الفرعي</span>
                    <span class="font-medium">{{ cart.total() }} ر.س</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary">الشحن</span>
                    <span class="font-medium">{{ shippingCost }} ر.س</span>
                  </div>
                </div>

                <div class="py-4">
                  <div class="flex justify-between text-lg font-bold">
                    <span>الإجمالي</span>
                    <span class="text-primary">{{ finalTotal }} ر.س</span>
                  </div>
                </div>

                <button (click)="processPayment()" [disabled]="processing()" 
                        class="btn-primary w-full py-3 text-lg disabled:opacity-50">
                  @if (processing()) {
                    جاري المعالجة...
                  } @else {
                    دفع {{ finalTotal }} ر.س
                  }
                </button>

                <p class="text-xs text-text-secondary text-center mt-4">
                  🔒 الدفع آمن ومشفر
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CheckoutComponent {
  cart = inject(CartService);
  private router = inject(Router);
  
  processing = signal(false);

  shippingInfo = {
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  };

  paymentMethod = 'card';
  cardInfo = {
    number: '',
    expiry: '',
    cvv: ''
  };

  get shippingCost(): number {
    return this.cart.total() > 500 ? 0 : 25;
  }

  get finalTotal(): number {
    return this.cart.total() + this.shippingCost;
  }

  processPayment() {
    if (!this.shippingInfo.name || !this.shippingInfo.phone || !this.shippingInfo.address) {
      alert('الرجاء إكمال معلومات الشحن');
      return;
    }

    if (this.paymentMethod === 'card' && (!this.cardInfo.number || !this.cardInfo.expiry || !this.cardInfo.cvv)) {
      alert('الرجاء إدخال معلومات البطاقة');
      return;
    }

    this.processing.set(true);

    setTimeout(() => {
      this.cart.checkout().subscribe({
        next: () => {
          this.cart.clearCart();
          this.processing.set(false);
          alert('تم الدفع بنجاح! شكراً لطلبك');
          this.router.navigate(['/profile/orders']);
        },
        error: () => {
          this.processing.set(false);
          alert('فشل الدفع. الرجاء المحاولة مرة أخرى');
        }
      });
    }, 2000);
  }
}