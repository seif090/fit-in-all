import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-text-primary mb-8">السوق</h1>
        
        <!-- Tabs -->
        <div class="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button (click)="activeTab = 'all'" [class]="activeTab === 'all' ? 'btn-primary' : 'btn-secondary'">الكل</button>
          <button (click)="activeTab = 'gyms'" [class]="activeTab === 'gyms' ? 'btn-primary' : 'btn-secondary'">صالات</button>
          <button (click)="activeTab = 'coaches'" [class]="activeTab === 'coaches' ? 'btn-primary' : 'btn-secondary'">مدربين</button>
          <button (click)="activeTab = 'doctors'" [class]="activeTab === 'doctors' ? 'btn-primary' : 'btn-secondary'">أطباء</button>
          <button (click)="activeTab = 'products'" [class]="activeTab === 'products' ? 'btn-primary' : 'btn-secondary'">منتجات</button>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filters Sidebar -->
          <aside class="lg:w-64 shrink-0">
            <div class="card sticky top-24">
              <h3 class="font-semibold mb-4">الفلاتر</h3>
              
              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">الفئة</label>
                <select class="input">
                  <option>الكل</option>
                  <option>صالات رياضية</option>
                  <option>مدربين</option>
                  <option>أطباء</option>
                  <option>مكملات غذائية</option>
                </select>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">السعر</label>
                <div class="flex gap-2">
                  <input type="number" placeholder="من" class="input" />
                  <input type="number" placeholder="إلى" class="input" />
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium mb-2">التقييم</label>
                <div class="flex gap-2">
                  @for (star of [1,2,3,4,5]; track star) {
                    <button class="text-secondary text-xl">★</button>
                  }
                </div>
              </div>

              <button class="btn-primary w-full">تطبيق الفلاتر</button>
            </div>
          </aside>

          <!-- Items Grid -->
          <div class="flex-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (item of items; track item.id) {
                <div class="card group">
                  <div class="h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{{item.category}}</span>
                  <h3 class="font-semibold mt-2 mb-1">{{item.name}}</h3>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <span class="text-secondary">★</span>
                      <span class="mr-1 text-sm">{{item.rating}}</span>
                    </div>
                    <span class="text-primary font-bold">{{item.price}}</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MarketplaceComponent {
  activeTab = 'all';

  items = [
    { id: 1, name: 'صالة اللياقة الذهبية', category: 'صالات', rating: 4.8, price: '299 ر.س/شهر', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400' },
    { id: 2, name: 'أحمد محمد - مدرب شخصي', category: 'مدربين', rating: 4.9, price: '200 ر.س/ séance', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400' },
    { id: 3, name: 'بروتين واي', category: 'مكملات', rating: 4.7, price: '189 ر.س', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400' },
    { id: 4, name: 'فيتنس بلس', category: 'صالات', rating: 4.6, price: '249 ر.س/شهر', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400' },
    { id: 5, name: 'د. سارة - أخصائية تغذية', category: 'أطباء', rating: 5.0, price: '150 ر.س/استشارة', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400' },
    { id: 6, name: 'كرياتين', category: 'مكملات', rating: 4.5, price: '99 ر.س', image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400' },
    { id: 7, name: 'جym برو', category: 'صالات', rating: 4.9, price: '399 ر.س/شهر', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400' },
    { id: 8, name: ' BCAAs', category: 'مكملات', rating: 4.6, price: '129 ر.س', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400' },
    { id: 9, name: 'محمد خالد - كمال أجسام', category: 'مدربين', rating: 4.8, price: '250 ر.س/ساعة', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  ];
}