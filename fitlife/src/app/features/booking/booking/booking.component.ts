import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, TimeSlot, Booking } from '../../../core/services/booking.service';

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  date: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-text-primary mb-8">احجز موعد</h1>

        @if (loading()) {
          <div class="flex justify-center py-12">
            <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        } @else {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Calendar -->
            <div class="lg:col-span-2">
              <div class="card">
                <div class="flex items-center justify-between mb-6">
                  <button (click)="previousMonth()" class="p-2 hover:bg-background rounded-lg">←</button>
                  <h2 class="text-xl font-semibold">{{ currentMonthName }} {{ currentYear }}</h2>
                  <button (click)="nextMonth()" class="p-2 hover:bg-background rounded-lg">→</button>
                </div>
                
                <div class="grid grid-cols-7 gap-2 mb-4">
                  @for (day of weekDays; track day) {
                    <div class="text-center text-sm text-text-secondary font-medium">{{day}}</div>
                  }
                </div>
                
                <div class="grid grid-cols-7 gap-2">
                  @for (day of calendarDays; track day.date) {
                    <button (click)="selectDate(day)" 
                            [class]="day.isCurrentMonth ? 'p-3 rounded-lg text-center hover:bg-primary/10 cursor-pointer' : 'p-3 rounded-lg text-center text-text-secondary hover:bg-background cursor-pointer'"
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
                @if (selectedDate()) {
                  <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    @for (slot of availableSlots(); track slot.time) {
                      <button (click)="selectSlot(slot)"
                              [class]="slot.isAvailable ? 'py-3 px-4 rounded-lg border border-border hover:border-primary hover:text-primary cursor-pointer' : 'py-3 px-4 rounded-lg border border-border text-text-secondary opacity-50 cursor-not-allowed'"
                              [class.bg-primary]="slot.isSelected"
                              [class.text-white]="slot.isSelected"
                              [disabled]="!slot.isAvailable">
                        {{slot.time}}
                      </button>
                    }
                  </div>
                } @else {
                  <p class="text-text-secondary text-center py-4">الرجاء اختيار التاريخ</p>
                }
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
                  <p class="font-medium">{{ selectedDate() || 'لم يُحدد' }}</p>
                </div>
                
                <div class="border-b border-border pb-4 mb-4">
                  <p class="text-sm text-text-secondary">الوقت</p>
                  <p class="font-medium">{{ selectedTime() || 'لم يُحدد' }}</p>
                </div>
                
                <div class="mb-6">
                  <p class="text-sm text-text-secondary">السعر</p>
                  <p class="text-2xl font-bold text-primary">200 ر.س</p>
                </div>

                <button (click)="confirmBooking()" [disabled]="!canBook()" class="btn-primary w-full py-3 disabled:opacity-50">
                  تأكيد الحجز
                </button>
              </div>
            </div>
          </div>

          <!-- My Bookings -->
          <div class="mt-12">
            <h2 class="text-2xl font-semibold mb-6">حجوزاتي</h2>
            <div class="grid gap-4">
              @for (booking of bookings(); track booking.id) {
                <div class="card">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-semibold">{{ booking.serviceName }}</h3>
                      <p class="text-sm text-text-secondary">{{ booking.providerName }} - {{ booking.date }} {{ booking.time }}</p>
                    </div>
                    <span [class]="booking.status === 'confirmed' ? 'bg-success/10 text-success' : 
                                 booking.status === 'pending' ? 'bg-secondary/10 text-secondary' : 
                                 'bg-error/10 text-error'" 
                          class="px-3 py-1 rounded-full text-sm">
                      {{ booking.status === 'confirmed' ? 'مؤكد' : booking.status === 'pending' ? 'قيد الانتظار' : 'ملغى' }}
                    </span>
                  </div>
                </div>
              } @empty {
                <p class="text-text-secondary text-center py-8">لا توجد حجوزات سابقة</p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class BookingComponent implements OnInit {
  loading = signal(true);
  bookings = signal<Booking[]>([]);
  availableSlots = signal<TimeSlot[]>([]);
  selectedDate = signal<string>('');
  selectedTime = signal<string>('');

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth();
  
  weekDays = ['أحد', 'إثن', 'ثلاث', 'أرب', 'خمي', 'جمع', 'سبت'];
  calendarDays: CalendarDay[] = [];

  monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  get currentMonthName() { return this.monthNames[this.currentMonth]; }

  constructor(private bookingService: BookingService) {
    this.generateCalendar();
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getUserBookings().subscribe({
      next: (data) => {
        this.bookings.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    this.calendarDays = [];

    const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
    for (let i = startDay - 1; i >= 0; i--) {
      this.calendarDays.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isSelected: false,
        date: ''
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const dateStr = date.toISOString().split('T')[0];
      this.calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isSelected: dateStr === this.selectedDate(),
        date: dateStr
      });
    }

    const remaining = 42 - this.calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      this.calendarDays.push({
        day: i,
        isCurrentMonth: false,
        isSelected: false,
        date: ''
      });
    }
  }

  previousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  selectDate(day: CalendarDay) {
    if (!day.isCurrentMonth || !day.date) return;
    
    this.selectedDate.set(day.date);
    this.selectedTime.set('');
    
    this.calendarDays = this.calendarDays.map(d => ({
      ...d,
      isSelected: d.date === day.date
    }));

    this.loadSlots(day.date);
  }

  loadSlots(date: string) {
    this.availableSlots.set([
      { time: '08:00 ص', isAvailable: true, isSelected: false },
      { time: '09:00 ص', isAvailable: true, isSelected: false },
      { time: '10:00 ص', isAvailable: true, isSelected: false },
      { time: '11:00 ص', isAvailable: true, isSelected: false },
      { time: '12:00 م', isAvailable: false, isSelected: false },
      { time: '01:00 م', isAvailable: true, isSelected: false },
      { time: '02:00 م', isAvailable: true, isSelected: false },
      { time: '03:00 م', isAvailable: false, isSelected: false },
      { time: '04:00 م', isAvailable: true, isSelected: false },
      { time: '05:00 م', isAvailable: true, isSelected: false },
      { time: '06:00 م', isAvailable: true, isSelected: false },
      { time: '07:00 م', isAvailable: true, isSelected: false },
    ]);
  }

  selectSlot(slot: TimeSlot) {
    if (!slot.isAvailable) return;
    
    this.selectedTime.set(slot.time);
    this.availableSlots.set(
      this.availableSlots().map(s => ({
        ...s,
        isSelected: s.time === slot.time
      }))
    );
  }

  canBook() {
    return this.selectedDate() && this.selectedTime();
  }

  confirmBooking() {
    if (!this.canBook()) return;

    this.bookingService.createBooking({
      serviceId: '1',
      serviceType: 'coach',
      date: this.selectedDate(),
      time: this.selectedTime()
    }).subscribe({
      next: (booking) => {
        this.bookings.update(b => [...b, booking]);
        this.selectedDate.set('');
        this.selectedTime.set('');
        alert('تم تأكيد الحجز بنجاح!');
      },
      error: () => {
        alert('فشل تأكيد الحجز. الرجاء المحاولة مرة أخرى');
      }
    });
  }
}