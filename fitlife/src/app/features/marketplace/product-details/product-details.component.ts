import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a routerLink="/marketplace" class="text-primary mb-4 inline-flex items-center">
          <span>←</span>
          <span class="mr-2">العودة للسوق</span>
        </a>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Image -->
          <div class="bg-white rounded-xl p-8">
            <img [src]="product.image" [alt]="product.name" class="w-full h-96 object-contain" />
          </div>

          <!-- Details -->
          <div>
            <span class="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{{product.category}}</span>
            <h1 class="text-3xl font-bold mt-4 mb-4">{{product.name}}</h1>
            
            <div class="flex items-center mb-4">
              <span class="text-secondary text-xl">★</span>
              <span class="mr-1 font-semibold">{{product.rating}}</span>
              <span class="mr-2 text-text-secondary">({{product.reviews}} تقييم)</span>
            </div>

            <div class="text-4xl font-bold text-primary mb-6">{{product.price}} ر.س</div>

            <p class="text-text-secondary mb-6">{{product.description}}</p>

            <!-- Specs -->
            <div class="card mb-6">
              <h3 class="font-semibold mb-4">المواصفات</h3>
              <div class="space-y-2">
                @for (spec of product.specs; track spec.label) {
                  <div class="flex justify-between">
                    <span class="text-text-secondary">{{spec.label}}</span>
                    <span class="font-medium">{{spec.value}}</span>
                  </div>
                }
              </div>
            </div>

            <div class="flex gap-4">
              <button class="btn-primary flex-1 py-4 text-lg">أضف للسلة</button>
              <button class="btn-secondary py-4 px-6">
                <span class="text-2xl">♡</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="mt-12">
          <h2 class="text-2xl font-semibold mb-6">منتجات مشابهة</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (item of relatedProducts; track item.id) {
              <a [routerLink]="['/product', item.id]" class="card group">
                <div class="h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h3 class="font-semibold mb-2">{{item.name}}</h3>
                <span class="text-primary font-bold">{{item.price}} ر.س</span>
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailsComponent {
  product = {
    name: 'بروتين واي GOLD',
    category: 'مكملات غذائية',
    rating: 4.7,
    reviews: 156,
    price: 189,
    description: 'بروتين whey عالي الجودة يساعد على بناء العضلات والتعافي بعد التمارين. يحتوي على 24g بروتين لكل servings ويفضل استخدامه بعد التمرين.',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600',
    specs: [
      { label: 'العلامة التجارية', value: 'Optimum Nutrition' },
      { label: 'الوزن', value: '2.27 كجم' },
      { label: 'النكهة', value: 'شوكولاتة' },
      { label: 'البروتين', value: '24g لكل servings' },
    ]
  };

  relatedProducts = [
    { id: 2, name: 'كرياتين مونوهيدرات', price: 99, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400' },
    { id: 3, name: 'مولتيب فيتامن', price: 149, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    { id: 4, name: 'BCAAs', price: 129, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400' },
    { id: 5, name: 'أوميغا 3', price: 89, image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400' },
  ];
}