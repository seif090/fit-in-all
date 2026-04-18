import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <footer class="bg-surface border-t border-border mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Company -->
          <div>
            <h3 class="font-semibold mb-4">الشركة</h3>
            <ul class="space-y-2">
              <li><a routerLink="/about" class="text-text-secondary hover:text-primary">عن FitLife</a></li>
              <li><a routerLink="/careers" class="text-text-secondary hover:text-primary">وظائف</a></li>
              <li><a routerLink="/press" class="text-text-secondary hover:text-primary">الصحافة</a></li>
              <li><a routerLink="/blog" class="text-text-secondary hover:text-primary">المدونة</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="font-semibold mb-4">الدعم</h3>
            <ul class="space-y-2">
              <li><a routerLink="/help" class="text-text-secondary hover:text-primary">المركز الرئيسي</a></li>
              <li><a routerLink="/help" class="text-text-secondary hover:text-primary">الأسئلة الشائعة</a></li>
              <li><a routerLink="/help" class="text-text-secondary hover:text-primary">تواصل معنا</a></li>
              <li><a routerLink="/help" class="text-text-secondary hover:text-primary">الإبلاغ عن مشكلة</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="font-semibold mb-4">قانوني</h3>
            <ul class="space-y-2">
              <li><a routerLink="/privacy" class="text-text-secondary hover:text-primary">سياسة الخصوصية</a></li>
              <li><a routerLink="/terms" class="text-text-secondary hover:text-primary">الشروط والأحكام</a></li>
              <li><a routerLink="/refund" class="text-text-secondary hover:text-primary">سياسة الاسترداد</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="font-semibold mb-4">تواصل معنا</h3>
            <ul class="space-y-2">
              <li class="text-text-secondary">الرياض، المملكة العربية السعودية</li>
              <li><a href="mailto:support@fitlife.com" class="text-text-secondary hover:text-primary">support&#64;fitlife.com</a></li>
              <li><a href="tel:+966500000000" class="text-text-secondary hover:text-primary">+966 50 000 0000</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom -->
        <div class="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-2xl font-bold text-primary">FitLife</div>
          <p class="text-text-secondary text-sm">© 2026 FitLife. جميع الحقوق محفوظة.</p>
          <div class="flex gap-4">
            <a href="#" class="text-text-secondary hover:text-primary">Twitter</a>
            <a href="#" class="text-text-secondary hover:text-primary">Instagram</a>
            <a href="#" class="text-text-secondary hover:text-primary">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}