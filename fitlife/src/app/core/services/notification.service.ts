import { Injectable, signal, computed } from '@angular/core';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
  createdAt: Date;
  link?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSignal = signal<Notification[]>([]);
  
  notifications = computed(() => this.notificationsSignal());
  unreadCount = computed(() => this.notificationsSignal().filter(n => !n.read).length);

  constructor() {
    this.loadNotifications();
  }

  private loadNotifications() {
    const saved = localStorage.getItem('fitlife_notifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.notificationsSignal.set(parsed.map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt)
      })));
    } else {
      this.notificationsSignal.set(this.getDefaultNotifications());
    }
  }

  private saveNotifications() {
    localStorage.setItem('fitlife_notifications', JSON.stringify(this.notificationsSignal()));
  }

  private getDefaultNotifications(): Notification[] {
    return [
      {
        id: '1',
        title: 'تم تأكيد حجزك',
        message: 'تم تأكيد موعدك مع أحمد محمد في تاريخ 20 أبريل 2026',
        type: 'success',
        read: false,
        createdAt: new Date(Date.now() - 3600000),
        link: '/booking'
      },
      {
        id: '2',
        title: 'خصم خاص',
        message: 'خصم 20% على جميع مكملات البروتين هذا الأسبوع!',
        type: 'info',
        read: false,
        createdAt: new Date(Date.now() - 86400000),
        link: '/marketplace'
      },
      {
        id: '3',
        title: 'تذكير بالتمارين',
        message: 'حان وقت تمرينك اليوم! لديك جلسة في الصالة بعد ساعتين',
        type: 'warning',
        read: true,
        createdAt: new Date(Date.now() - 172800000)
      },
      {
        id: '4',
        title: 'اشتراك ينتهي قريباً',
        message: 'اشتراكك في صالة اللياقة الذهبية ينتهي بعد 5 أيام، فكر في التجديد',
        type: 'warning',
        read: true,
        createdAt: new Date(Date.now() - 259200000)
      },
    ];
  }

  addNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      read: false,
      createdAt: new Date()
    };
    this.notificationsSignal.update(n => [newNotification, ...n]);
    this.saveNotifications();
  }

  markAsRead(id: string) {
    this.notificationsSignal.update(notifications =>
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
    this.saveNotifications();
  }

  markAllAsRead() {
    this.notificationsSignal.update(notifications =>
      notifications.map(n => ({ ...n, read: true }))
    );
    this.saveNotifications();
  }

  deleteNotification(id: string) {
    this.notificationsSignal.update(notifications =>
      notifications.filter(n => n.id !== id)
    );
    this.saveNotifications();
  }

  clearAll() {
    this.notificationsSignal.set([]);
    this.saveNotifications();
  }
}