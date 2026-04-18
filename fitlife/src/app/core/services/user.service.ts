import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Subscription {
  id: string;
  gymId: string;
  gymName: string;
  plan: string;
  price: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
}

export interface Order {
  id: string;
  products: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface UserStats {
  weight: number;
  targetWeight: number;
  caloriesConsumed: number;
  caloriesTarget: number;
  goalProgress: number;
}

export interface Activity {
  id: number;
  icon: string;
  title: string;
  time: string;
  value: string;
  type: 'workout' | 'meal' | 'water' | 'sleep';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) {}

  getProfile(): Observable<any> {
    return this.api.get('/users/profile');
  }

  updateProfile(data: any): Observable<any> {
    return this.api.put('/users/profile', data);
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.api.get<Subscription[]>('/subscriptions');
  }

  getOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('/orders');
  }

  getStats(): Observable<UserStats> {
    return this.api.get<UserStats>('/users/stats');
  }

  getRecentActivity(): Observable<Activity[]> {
    return this.api.get<Activity[]>('/users/activity');
  }

  updateWeight(weight: number): Observable<any> {
    return this.api.put('/users/weight', { weight });
  }

  logActivity(activity: Partial<Activity>): Observable<any> {
    return this.api.post('/users/activity', activity);
  }
}