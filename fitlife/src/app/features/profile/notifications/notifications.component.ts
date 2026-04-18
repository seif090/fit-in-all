import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <a routerLink="/profile" class="text-primary hover:underline">← العودة</a>
            <h1 class="text-3xl font-bold text-text-primary">الإشعارات</h1>
          </div>
          @if (notificationService.unreadCount() > 0) {
            <button (click)="markAllRead()" class="text-sm text-primary hover:underline">
              تحديد الكل كمقروء
            </button>
          }
        </div>

        @if (notificationService.notifications().length === 0) {
          <div class="card text-center py-12">
            <div class="text-6xl mb-4">🔔</div>
            <h2 class="text-xl font-semibold mb-2">لا توجد إشعارات</h2>
            <p class="text-text-secondary">ستظهر إشعاراتك هنا</p>
          </div>
        } @else {
          <div class="space-y-4">
            @for (notification of notificationService.notifications(); track notification.id) {
              <div [class]="notification.read ? 'card opacity-75' : 'card'"
                   (click)="handleNotificationClick(notification)">
                <div class="flex gap-4">
                  <div [class]="getIconClass(notification.type)" 
                       class="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    @switch (notification.type) {
                      @case ('success') { ✓ }
                      @case ('error') { ✕ }
                      @case ('warning') { ⚠ }
                      @default { ℹ }
                    }
                  </div>
                  <div class="flex-1">
                    <div class="flex items-start justify-between gap-2">
                      <h3 [class]="notification.read ? 'font-medium text-text-secondary' : 'font-semibold'">
                        {{ notification.title }}
                      </h3>
                      @if (!notification.read) {
                        <span class="w-2 h-2 bg-primary rounded-full"></span>
                      }
                    </div>
                    <p class="text-sm text-text-secondary mt-1">{{ notification.message }}</p>
                    <p class="text-xs text-text-secondary mt-2">{{ getTimeAgo(notification.createdAt) }}</p>
                  </div>
                  <button (click)="deleteNotification($event, notification.id)" 
                          class="text-text-secondary hover:text-error">
                    ✕
                  </button>
                </div>
              </div>
            }
          </div>

          @if (notificationService.notifications().length > 0) {
            <div class="mt-6 text-center">
              <button (click)="clearAll()" class="text-sm text-error hover:underline">
                مسح جميع الإشعارات
              </button>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class NotificationsComponent {
  notificationService = inject(NotificationService);

  getIconClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-success/10 text-success';
      case 'error': return 'bg-error/10 text-error';
      case 'warning': return 'bg-secondary/10 text-secondary';
      default: return 'bg-accent/10 text-accent';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'منذ دقائق';
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
    return new Date(date).toLocaleDateString('ar-SA');
  }

  handleNotificationClick(notification: any) {
    this.notificationService.markAsRead(notification.id);
  }

  deleteNotification(event: Event, id: string) {
    event.stopPropagation();
    this.notificationService.deleteNotification(id);
  }

  markAllRead() {
    this.notificationService.markAllAsRead();
  }

  clearAll() {
    if (confirm('هل أنت متأكد من مسح جميع الإشعارات؟')) {
      this.notificationService.clearAll();
    }
  }
}