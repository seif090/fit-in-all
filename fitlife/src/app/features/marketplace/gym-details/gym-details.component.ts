import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gym-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a routerLink="/marketplace" class="text-primary mb-4 inline-flex items-center">
          <span>←</span>
          <span class="mr-2">العودة للسوق</span>
        </a>

        <!-- Gallery -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div class="space-y-4">
            <div class="h-80 bg-gray-200 rounded-xl overflow-hidden">
              <img [src]="gym.images[0]" alt="Main" class="w-full h-full object-cover" />
            </div>
            <div class="grid grid-cols-4 gap-2">
              @for (img of gym.images.slice(1, 5); track img) {
                <div class="h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary">
                  <img [src]="img" class="w-full h-full object-cover" />
                </div>
              }
            </div>
          </div>

          <div>
            <h1 class="text-3xl font-bold mb-2">{{gym.name}}</h1>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center">
                <span class="text-secondary text-xl">★</span>
                <span class="mr-1 font-semibold">{{gym.rating}}</span>
              </div>
              <span class="text-text-secondary">({{gym.reviews}} تقييم)</span>
            </div>
            <p class="text-text-secondary mb-6">{{gym.location}}</p>

            <div class="card mb-6">
              <h3 class="font-semibold mb-4">السعر</h3>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-primary">{{gym.price}} ر.س</span>
                <span class="text-text-secondary">/ شهر</span>
              </div>
            </div>

            <button class="btn-primary w-full py-4 text-lg mb-4">اشترك الآن</button>
            <button class="btn-secondary w-full py-4 text-lg">احجز تجربة مجانية</button>
          </div>
        </div>

        <!-- Description -->
        <div class="card mb-8">
          <h2 class="text-xl font-semibold mb-4">الوصف</h2>
          <p class="text-text-secondary leading-relaxed">{{gym.description}}</p>
        </div>

        <!-- Features -->
        <div class="card mb-8">
          <h2 class="text-xl font-semibold mb-4">المرافق والخدمات</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            @for (feature of gym.features; track feature) {
              <div class="flex items-center gap-2">
                <span class="text-primary">✓</span>
                <span>{{feature}}</span>
              </div>
            }
          </div>
        </div>

        <!-- Reviews -->
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">التقييمات</h2>
          @for (review of gym.reviewList; track review.user) {
            <div class="border-b border-border pb-4 mb-4 last:border-0">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">{{review.user}}</span>
                <div class="flex text-secondary">{{review.rating}} ★</div>
              </div>
              <p class="text-text-secondary text-sm">{{review.comment}}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class GymDetailsComponent {
  gym = {
    name: 'صالة اللياقة الذهبية',
    rating: 4.8,
    reviews: 245,
    location: 'الرياض - حي الازدهار',
    price: 299,
    description: 'صالة رياضية مجهزة بأحدث الأجهزة fitness مع مدربين محترفين ومساحات متنوعة للتمارين. نقدم برامج مخصصة لكل مستوى ونضمن لك بيئة داعمة لتحقيق أهدافك.',
    features: ['أجهزة حديثة', 'مدربين personal', 'دروس جماعية', 'ساونا', 'غرفة تغيير', 'WiFi مجاني', ' parking', 'شاشات ذكية'],
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400',
    ],
    reviewList: [
      { user: 'أحمد', rating: 5, comment: 'أفضل صالة رياضية!设备和 مدربين ممتازين' },
      { user: 'سارة', rating: 4, comment: 'مكان رائع وخدمة ممتازة' },
      { user: 'خالد', rating: 5, comment: 'أنصح الجميع بهذه الصالة' },
    ]
  };
}