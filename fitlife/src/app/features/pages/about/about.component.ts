import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Hero -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-text-primary mb-4">عن FitLife</h1>
          <p class="text-xl text-text-secondary">منصتك الشاملة للياقة والصحة</p>
        </div>

        <!-- Mission -->
        <div class="card mb-8">
          <h2 class="text-2xl font-semibold mb-4">مهمتنا</h2>
          <p class="text-text-secondary leading-relaxed">
            نسعى في FitLife لجعل اللياقة الصحية متاحة للجميع. نوفر منصة شاملة تجمع بين أفضل الصالات الرياضية، 
            المدربين المحترفين، الأخصائيين الصحيين، ومنتجات الصحة واللياقة في مكان واحد.
          </p>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="card">
            <div class="text-4xl mb-4">🏋️</div>
            <h3 class="text-xl font-semibold mb-2">صالات رياضية</h3>
            <p class="text-text-secondary">اكتشف أفضل الصالات الرياضية القريبة منك واحجز اشتراكك بسهولة</p>
          </div>
          <div class="card">
            <div class="text-4xl mb-4">👨‍🏫</div>
            <h3 class="text-xl font-semibold mb-2">مدربين محترفين</h3>
            <p class="text-text-secondary">تواصل مع مدربين معتمدين واحجز جلسات تدريب شخصية أو عن بُعد</p>
          </div>
          <div class="card">
            <div class="text-4xl mb-4">👨‍⚕️</div>
            <h3 class="text-xl font-semibold mb-2">أخصائيين صحيين</h3>
            <p class="text-text-secondary">استشر أطباء ومتخصصين في التغذية والصحة الرياضية</p>
          </div>
          <div class="card">
            <div class="text-4xl mb-4">💊</div>
            <h3 class="text-xl font-semibold mb-2">مكملات غذائية</h3>
            <p class="text-text-secondary">تسوق أفضل المنتجات والفيتاميناتnutrition من علامات تجارية موثوقة</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="card mb-8">
          <h2 class="text-2xl font-semibold mb-6 text-center">أرقامنا</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">150+</div>
              <div class="text-text-secondary">صالة رياضية</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">500+</div>
              <div class="text-text-secondary">مدرب ومحترف</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">50,000+</div>
              <div class="text-text-secondary">عميل سعيد</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">4.8</div>
              <div class="text-text-secondary">تقييم العملاء</div>
            </div>
          </div>
        </div>

        <!-- Team -->
        <div class="card mb-8">
          <h2 class="text-2xl font-semibold mb-6">فريقنا</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span class="text-4xl">👨‍💼</span>
              </div>
              <h3 class="font-semibold">أحمد الزهراني</h3>
              <p class="text-sm text-text-secondary">الرئيس التنفيذي</p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span class="text-4xl">👩‍💼</span>
              </div>
              <h3 class="font-semibold">سارة الغامدي</h3>
              <p class="text-sm text-text-secondary">مدير العمليات</p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span class="text-4xl">👨‍💻</span>
              </div>
              <h3 class="font-semibold">محمد الحربي</h3>
              <p class="text-sm text-text-secondary">مدير التقنية</p>
            </div>
            <div class="text-center">
              <div class="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span class="text-4xl">👩‍⚕️</span>
              </div>
              <h3 class="font-semibold">د. فاطمة</h3>
              <p class="text-sm text-text-secondary">استشارية التغذية</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center">
          <h2 class="text-2xl font-semibold mb-4">انضم إلى عائلة FitLife</h2>
          <p class="text-text-secondary mb-6">ابدأ رحلتك الصحية اليوم</p>
          <a routerLink="/auth/register" class="btn-primary">إنشاء حساب مجاني</a>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}