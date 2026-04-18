import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarketplaceService, Coach, Doctor } from '../../../core/services/marketplace.service';

@Component({
  selector: 'app-coach-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <a routerLink="/marketplace" class="text-primary hover:underline mb-4 inline-flex items-center">
          <span>←</span>
          <span class="mr-2">العودة للسوق</span>
        </a>

        @if (loading()) {
          <div class="flex justify-center py-12">
            <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        } @else {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Profile -->
            <div class="lg:col-span-1">
              <div class="card text-center">
                <div class="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img [src]="profile()?.image" [alt]="profile()?.name" class="w-full h-full object-cover" />
                </div>
                <h1 class="text-2xl font-bold">{{ profile()?.name }}</h1>
                <p class="text-text-secondary">{{ profile()?.specialty }}</p>
                <div class="flex items-center justify-center gap-2 mt-2">
                  <span class="text-secondary text-xl">★</span>
                  <span class="font-semibold">{{ profile()?.rating }}</span>
                  <span class="text-text-secondary">({{ profile()?.reviews || 0 }} تقييم)</span>
                </div>
                
                <div class="mt-6 text-3xl font-bold text-primary">{{ profile()?.price }} ر.س</div>
                <p class="text-text-secondary text-sm">للجلسة</p>
                
                <button class="btn-primary w-full mt-4">احجز جلسة الآن</button>
                <button class="btn-secondary w-full mt-2">تواصل</button>
              </div>
            </div>

            <!-- Details -->
            <div class="lg:col-span-2 space-y-6">
              <!-- About -->
              <div class="card">
                <h2 class="text-xl font-semibold mb-4">عن المدرب</h2>
                <p class="text-text-secondary leading-relaxed">
                  {{ profile()?.bio || 'مدرب محترف متخصص في ' + profile()?.specialty + ' بخبرة طويلة في المجال. يهدف لمساعدة العملاء على تحقيق أهدافهم الصحية واللياقية من خلال برامج تدريبية مخصصة واعتماد أساليب علمية حديثة.' }}
                </p>
              </div>

              <!-- Services -->
              <div class="card">
                <h2 class="text-xl font-semibold mb-4">الخدمات المقدمة</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <span class="text-2xl">💪</span>
                    <div>
                      <p class="font-medium">تدريب شخصي</p>
                      <p class="text-sm text-text-secondary">{{ profile()?.price }} ر.س/جلسة</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <span class="text-2xl">📋</span>
                    <div>
                      <p class="font-medium">برنامج مخصص</p>
                      <p class="text-sm text-text-secondary">299 ر.س/شهر</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <span class="text-2xl">🥗</span>
                    <div>
                      <p class="font-medium">استشارة تغذية</p>
                      <p class="text-sm text-text-secondary">150 ر.س/استشارة</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <span class="text-2xl">🎥</span>
                    <div>
                      <p class="font-medium">تدريب عن بُعد</p>
                      <p class="text-sm text-text-secondary">{{ (profile()?.price || 0) * 0.7 }} ر.س/جلسة</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reviews -->
              <div class="card">
                <h2 class="text-xl font-semibold mb-4">التقييمات</h2>
                <div class="space-y-4">
                  @for (review of reviews(); track review.user) {
                    <div class="border-b border-border pb-4">
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-semibold">{{ review.user }}</span>
                        <div class="flex text-secondary">
                          @for (s of [1,2,3,4,5]; track s) {
                            <span [class]="s <= review.rating ? 'text-secondary' : 'text-gray-300'">★</span>
                          }
                        </div>
                      </div>
                      <p class="text-text-secondary text-sm">{{ review.comment }}</p>
                    </div>
                  }
                </div>
              </div>

              <!-- Availability -->
              <div class="card">
                <h2 class="text-xl font-semibold mb-4">الأوقات المتاحة</h2>
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  @for (slot of availableSlots; track slot) {
                    <button class="py-2 px-3 rounded-lg border border-border text-sm hover:border-primary cursor-pointer">
                      {{ slot }}
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class CoachDetailsComponent {
  private route = inject(ActivatedRoute);
  private marketplaceService = inject(MarketplaceService);

  loading = signal(true);
  profile = signal<Coach | Doctor | null>(null);
  reviews = signal<{ user: string; rating: number; comment: string }[]>([]);

  availableSlots = [
    '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProfile(id);
    }
  }

  loadProfile(id: string) {
    this.marketplaceService.getCoachById(id).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.reviews.set([
          { user: 'أحمد', rating: 5, comment: 'مدرب ممتاز! ساعدني على تحقيق هدفي في 3 أشهر' },
          { user: 'سارة', rating: 5, comment: 'very professional and knowledgeable' },
          { user: 'خالد', rating: 4, comment: 'تجربة جيدة، أنصح به بشدة' },
        ]);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}