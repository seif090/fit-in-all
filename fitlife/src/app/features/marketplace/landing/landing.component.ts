import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-primary to-primary-dark py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-3xl lg:text-5xl font-bold text-white mb-6">اكتشف رحلة اللياقة المثالية</h1>
          <p class="text-xl text-white/80 mb-8">صالة رياضية، مدربين، أطباء ومنتجات في مكان واحد</p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto mb-8">
            <div class="bg-white rounded-xl shadow-lg p-2 flex flex-col lg:flex-row gap-2">
              <input type="text" placeholder="ابحث عن صالات رياضية، مدربين، منتجات..." 
                     class="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary text-right" />
              <button class="btn-primary lg:w-auto w-full">بحث</button>
            </div>
          </div>

          <!-- Quick Filters -->
          <div class="flex justify-center gap-4 flex-wrap">
            <button class="bg-white/20 text-white px-6 py-2 rounded-full hover:bg-white/30 transition">
              صالات رياضية
            </button>
            <button class="bg-white/20 text-white px-6 py-2 rounded-full hover:bg-white/30 transition">
              أطباء
            </button>
            <button class="bg-white/20 text-white px-6 py-2 rounded-full hover:bg-white/30 transition">
              منتجات
            </button>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-12 bg-surface">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="section-title text-center">تصفح الفئات</h2>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <a routerLink="/marketplace" class="card text-center hover:border-2 border-primary">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/>
                </svg>
              </div>
              <h3 class="font-semibold">صالات رياضية</h3>
              <p class="text-sm text-text-secondary">150+ صالة</p>
            </a>
            <a routerLink="/marketplace" class="card text-center hover:border-2 border-primary">
              <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 class="font-semibold">تدريب</h3>
              <p class="text-sm text-text-secondary">80+ مدرب</p>
            </a>
            <a routerLink="/marketplace" class="card text-center hover:border-2 border-primary">
              <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <h3 class="font-semibold">مكملات</h3>
              <p class="text-sm text-text-secondary">200+ منتج</p>
            </a>
            <a routerLink="/marketplace" class="card text-center hover:border-2 border-primary">
              <div class="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 class="font-semibold">طب صحي</h3>
              <p class="text-sm text-text-secondary">40+ طبيب</p>
            </a>
          </div>
        </div>
      </section>

      <!-- Featured Gyms -->
      <section class="py-12 bg-background">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="section-title mb-0">الصالات المميزة</h2>
            <a routerLink="/marketplace" class="text-primary hover:underline">عرض الكل</a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (gym of gyms; track gym.id) {
              <a [routerLink]="['/gym', gym.id]" class="card overflow-hidden group">
                <div class="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img [src]="gym.image" [alt]="gym.name" class="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h3 class="font-semibold text-lg mb-2">{{gym.name}}</h3>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-secondary">★</span>
                    <span class="mr-1">{{gym.rating}}</span>
                  </div>
                  <span class="text-primary font-semibold">{{gym.price}} ر.س/شهر</span>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Coaches & Doctors -->
      <section class="py-12 bg-surface">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="section-title mb-0">أفضل المدربين والأخصائيين</h2>
            <a routerLink="/marketplace" class="text-primary hover:underline">عرض الكل</a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (coach of coaches; track coach.id) {
              <div class="card text-center">
                <div class="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img [src]="coach.image" [alt]="coach.name" class="w-full h-full object-cover" />
                </div>
                <h3 class="font-semibold">{{coach.name}}</h3>
                <p class="text-text-secondary text-sm mb-4">{{coach.specialty}}</p>
                <button class="btn-primary text-sm py-2 px-4">احجز الآن</button>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Products -->
      <section class="py-12 bg-background">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="section-title mb-0">المنتجات المميزة</h2>
            <a routerLink="/marketplace" class="text-primary hover:underline">عرض الكل</a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (product of products; track product.id) {
              <a [routerLink]="['/product', product.id]" class="card group">
                <div class="h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img [src]="product.image" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h3 class="font-semibold mb-2">{{product.name}}</h3>
                <div class="flex justify-between items-center">
                  <span class="text-primary font-bold">{{product.price}} ر.س</span>
                  <button class="text-sm bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary-dark">أضف للسلة</button>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">مستعد لتحويل حياتك؟</h2>
          <p class="text-white/80 mb-8 text-lg">انضم الآن وابدأ رحلتك الصحية مع أفضل المدربين والأخصائيين</p>
          <a routerLink="/auth/register" class="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            ابدأ الآن مجاناً
          </a>
        </div>
      </section>
    </div>
  `
})
export class LandingComponent {
  gyms = [
    { id: 1, name: 'صالة اللياقة الذهبية', rating: 4.8, price: 299, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400' },
    { id: 2, name: 'فيتنس بلس', rating: 4.6, price: 249, image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400' },
    { id: 3, name: 'جym برو', rating: 4.9, price: 399, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400' },
    { id: 4, name: 'آرت ليفيت', rating: 4.7, price: 349, image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400' },
  ];

  coaches = [
    { id: 1, name: 'أحمد محمد', specialty: 'مدرب شخصي', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200' },
    { id: 2, name: 'سارة علي', specialty: 'أخصائية تغذية', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200' },
    { id: 3, name: 'محمد خالد', specialty: 'مدرب كمال أجسام', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { id: 4, name: 'فاطمة حسن', specialty: 'طبيبة رياضية', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200' },
  ];

  products = [
    { id: 1, name: 'بروتين واي', price: 189, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400' },
    { id: 2, name: 'كرياتين', price: 99, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400' },
    { id: 3, name: 'مولتيب فيتامن', price: 149, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    { id: 4, name: ' BCAAs', price: 129, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400' },
  ];
}