import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isSelected?: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price: number;
  createdAt?: string;
}

export interface AvailableSlots {
  date: string;
  slots: TimeSlot[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private api: ApiService) {}

  getAvailableSlots(serviceId: string, date: string): Observable<AvailableSlots> {
    return this.api.get<AvailableSlots>(`/bookings/slots/${serviceId}?date=${date}`);
  }

  createBooking(data: {
    serviceId: string;
    serviceType: 'coach' | 'doctor' | 'gym';
    date: string;
    time: string;
  }): Observable<Booking> {
    return this.api.post<Booking>('/bookings', data);
  }

  getUserBookings(): Observable<Booking[]> {
    return this.api.get<Booking[]>('/bookings/my');
  }

  getBookingById(id: string): Observable<Booking> {
    return this.api.get<Booking>(`/bookings/${id}`);
  }

  cancelBooking(id: string): Observable<any> {
    return this.api.put(`/bookings/${id}`, { status: 'cancelled' });
  }

  rescheduleBooking(id: string, newDate: string, newTime: string): Observable<Booking> {
    return this.api.put<Booking>(`/bookings/${id}/reschedule`, { date: newDate, time: newTime });
  }
}