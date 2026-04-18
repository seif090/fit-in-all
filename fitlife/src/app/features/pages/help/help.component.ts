import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-text-primary mb-8">المساعدة والأسئلة الشائعة</h1>

        <!-- Contact Section -->
        <div class="card mb-8">
          <h2 class="text-xl font-semibold mb-4">تواصل معنا</h2>
          <p class="text-text-secondary mb-4">هل تحتاج إلى مساعدة؟ نحن هنا لمساعدتك!</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="tel:+966500000000" class="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-primary/5 cursor-pointer">
              <span class="text-2xl">📞</span>
              <div>
                <p class="font-medium">اتصل بنا</p>
                <p class="text-sm text-text-secondary">+966 50 000 0000</p>
              </div>
            </a>
            <a href="mailto:support@fitlife.com" class="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-primary/5 cursor-pointer">
              <span class="text-2xl">📧</span>
              <div>
                <p class="font-medium">راسلنا</p>
                <p class="text-sm text-text-secondary">support&#64;fitlife.com</p>
              </div>
            </a>
            <div class="flex items-center gap-3 p-4 bg-background rounded-lg cursor-pointer">
              <span class="text-2xl">💬</span>
              <div>
                <p class="font-medium">دردشة</p>
                <p class="text-sm text-text-secondary">متاح 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Categories -->
        <div class="space-y-6">
          @for (category of faqCategories; track category.title) {
            <div class="card">
              <h2 class="text-xl font-semibold mb-4">{{ category.title }}</h2>
              <div class="space-y-3">
                @for (faq of category.questions; track faq.question) {
                  <div class="border border-border rounded-lg overflow-hidden">
                    <button (click)="toggleQuestion(category.title + faq.question)" 
                            class="w-full p-4 text-right flex items-center justify-between hover:bg-background cursor-pointer">
                      <span class="font-medium">{{ faq.question }}</span>
                      <span [class]="openQuestions().has(category.title + faq.question) ? 'rotate-180' : ''" 
                            class="transition-transform">↓</span>
                    </button>
                    @if (openQuestions().has(category.title + faq.question)) {
                      <div class="p-4 pt-0 text-text-secondary">
                        {{ faq.answer }}
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class HelpComponent {
  openQuestions = signal<Set<string>>(new Set());

  faqCategories = [
    {
      title: 'الحجوزات والاشتراكات',
      questions: [
        { question: 'كيف أحجز جلسة مع مدرب؟', answer: 'يمكنك حجز جلسة من صفحة الملف الشخصي للمدرب أو من قسم الحجوزات. اختر المدرب المناسب ثم اختر الموعد المتاح.' },
        { question: 'هل يمكن إلغاء الحجز؟', answer: 'نعم، يمكنك إلغاء الحجز قبل 24 ساعة من موعد الجلسة للحصول على استرداد كامل.' },
        { question: 'كيف أتجديد اشتراكي؟', answer: 'اذهب إلى صفحة ملفك الشخصي > الاشتراكات > تجديد الاشتراك. يمكنك اختيار خطة الاشتراك المناسبة.' },
      ]
    },
    {
      title: 'الممشتريات والشحن',
      questions: [
        { question: 'ما هي طرق الدفع المتاحة؟', answer: 'نقبل بطاقات الائتمان (Visa, Mastercard, Mada)، Apple Pay، والدفع عند الاستلام.' },
        { question: 'كم تستغرق عملية الشحن؟', answer: 'الشحن يستغرق 3-5 أيام عمل داخل المملكة. الشحن مجاني للطلبات فوق 500 ريال.' },
        { question: 'هل يمكن إرجاع المنتج؟', answer: 'نعم، يمكنك إرجاع أي منتج خلال 14 يوم من تاريخ الاستلام شرط أن يكون في حالته الأصلية.' },
      ]
    },
    {
      title: 'الحساب والخصوصية',
      questions: [
        { question: 'كيف أغير كلمة المرور؟', answer: 'اذهب إلى الإعدادات > الأمان > تغيير كلمة المرور وأدخل كلمة المرور الجديدة.' },
        { question: 'كيف أحذف حسابي؟', answer: 'يمكنك حذف حسابك من الإعدادات > منطقة الخطر > حذف الحساب. هذا الإجراء لا يمكن التراجع عنه.' },
      ]
    }
  ];

  toggleQuestion(id: string) {
    this.openQuestions.update(set => {
      const newSet = new Set(set);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }
}