import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-text-primary mb-8">احجز موعد</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Calendar -->
          <div class="lg:col-span-2">
            <div class="card">
              <div class="flex items-center justify-between mb-6">
                <button class="p-2 hover:bg-background rounded-lg">←</button>
                <h2 class="text-xl font-semibold">أبريل 2026</h2>
                <button class="p-2 hover:bg-background rounded-lg">→</button>
              </div>
              
              <div class="grid grid-cols-7 gap-2 mb-4">
                @for (day of weekDays; track day) {
                  <div class="text-center text-sm text-text-secondary font-medium">{{day}}</div>
                }
              </div>
              
              <div class="grid grid-cols-7 gap-2">
                @for (day of calendarDays; track day.date) {
                  <button [class]="day.isCurrentMonth ? 'p-3 rounded-lg text-center hover:bg-primary/10' : 'p-3 rounded-lg text-center text-text-secondary hover:bg-background'"
                          [class.bg-primary]="day.isSelected"
                          [class.text-white]="day.isSelected">
                    {{day.day}}
                  </button>
                }
              </div>
            </div>

            <!-- Time Slots -->
            <div class="card mt-6">
              <h3 class="font-semibold mb-4">الأوقات المتاحة</h3>
              <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                @for (slot of timeSlots; track slot.time) {
                  <button [class]="slot.isAvailable ? 'py-3 px-4 rounded-lg border border-border hover:border-primary hover:text-primary' : 'py-3 px-4 rounded-lg border border-border text-text-secondary opacity-50 cursor-not-allowed'"
                          [class.bg-primary]="slot.isSelected"
                          [class.text-white]="slot.isSelected"
                          [disabled]="!slot.isAvailable">
                    {{slot.time}}
                  </button>
                }
              </div>
            </div>
          </div>

          <!-- Booking Summary -->
          <div>
            <div class="card sticky top-24">
              <h3 class="font-semibold mb-4">ملخص الحجز</h3>
              
              <div class="border-b border-border pb-4 mb-4">
                <p class="text-sm text-text-secondary">الخدمة</p>
                <p class="font-medium">تدريب شخصي</p>
              </div>
              
              <div class="border-b border-border pb-4 mb-4">
                <p class="text-sm text-text-secondary">المدرب</p>
                <p class="font-medium">أحمد محمد</p>
              </div>
              
              <div class="border-b border-border pb-4 mb-4">
                <p class="text-sm text-text-secondary">التاريخ</p>
                <p class="font-medium">18 أبريل 2026</p>
              </div>
              
              <div class="border-b border-border pb-4 mb-4">
                <p class="text-sm text-text-secondary">الوقت</p>
                <p class="font-medium">10:00 صباحاً</p>
              </div>
              
              <div class="mb-6">
                <p class="text-sm text-text-secondary">السعر</p>
                <p class="text-2xl font-bold text-primary">200 ر.س</p>
              </div>

              <button class="btn-primary w-full py-3">تأكيد الحجز</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingComponent {
  weekDays = ['أحد', 'إثن', 'ثلاث', 'أرب', 'خمي', 'جمع', 'سبت'];
  
  calendarDays = [
    { day: 29, isCurrentMonth: false, isSelected: false, date: 1 },
    { day: 30, isCurrentMonth: false, isSelected: false, date: 2 },
    { day: 1, isCurrentMonth: true, isSelected: false, date: 3 },
    { day: 2, isCurrentMonth: true, isSelected: true, date: 4 },
    { day: 3, isCurrentMonth: true, isSelected: false, date: 5 },
    { day: 4, isCurrentMonth: true, isSelected: false, date: 6 },
    { day: 5, isCurrentMonth: true, isSelected: false, date: 7 },
    { day: 6, isCurrentMonth: true, isSelected: false, date: 8 },
    { day: 7, isCurrentMonth: true, isSelected: false, date: 9 },
    { day: 8, isCurrentMonth: true, isSelected: false, date: 10 },
    { day: 9, isCurrentMonth: true, isSelected: false, date: 11 },
    { day: 10, isCurrentMonth: true, isSelected: false, date: 12 },
    { day: 11, isCurrentMonth: true, isSelected: false, date: 13 },
    { day: 12, isCurrentMonth: true, isSelected: false, date: 14 },
    { day: 13, isCurrentMonth: true, isSelected: false, date: 15 },
    { day: 14, isCurrentMonth: true, isSelected: false, date: 16 },
    { day: 15, isCurrentMonth: true, isSelected: false, date: 17 },
    { day: 16, isCurrentMonth: true, isSelected: false, date: 18 },
    { day: 17, isCurrentMonth: true, isSelected: false, date: 19 },
    { day: 18, isCurrentMonth: true, isSelected: false, date: 20 },
    { day: 19, isCurrentMonth: true, isSelected: false, date: 21 },
    { day: 20, isCurrentMonth: true, isSelected: false, date: 22 },
    { day: 21, isCurrentMonth: true, isSelected: false, date: 23 },
    { day: 22, isCurrentMonth: true, isSelected: false, date: 24 },
    { day: 23, isCurrentMonth: true, isSelected: false, date: 25 },
    { day: 24, isCurrentMonth: true, isSelected: false, date: 26 },
    { day: 25, isCurrentMonth: true, isSelected: false, date: 27 },
    { day: 26, isCurrentMonth: true, isSelected: false, date: 28 },
    { day: 27, isCurrentMonth: true, isSelected: false, date: 29 },
    { day: 28, isCurrentMonth: true, isSelected: false, date: 30 },
    { day: 29, isCurrentMonth: true, isSelected: false, date: 1 },
    { day: 30, isCurrentMonth: true, isSelected: false, date: 2 },
  ];

  timeSlots = [
    { time: '08:00 ص', isAvailable: true, isSelected: false },
    { time: '09:00 ص', isAvailable: true, isSelected: false },
    { time: '10:00 ص', isAvailable: true, isSelected: true },
    { time: '11:00 ص', isAvailable: true, isSelected: false },
    { time: '12:00 م', isAvailable: false, isSelected: false },
    { time: '01:00 م', isAvailable: true, isSelected: false },
    { time: '02:00 م', isAvailable: true, isSelected: false },
    { time: '03:00 م', isAvailable: false, isSelected: false },
    { time: '04:00 م', isAvailable: true, isSelected: false },
    { time: '05:00 م', isAvailable: true, isSelected: false },
    { time: '06:00 م', isAvailable: true, isSelected: false },
    { time: '07:00 م', isAvailable: true, isSelected: false },
  ];
}