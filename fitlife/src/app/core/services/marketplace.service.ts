import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApiService } from './api.service';

export interface Gym {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  images: string[];
  features: string[];
  category: string;
}

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  category: string;
  bio?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  category: string;
  bio?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  specs?: { label: string; value: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface MarketplaceFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  private loadingSignal = signal(false);
  loading = () => this.loadingSignal();

  constructor(private api: ApiService) {}

  getGyms(filters?: MarketplaceFilters): Observable<Gym[]> {
    return this.api.get<Gym[]>('/gyms');
  }

  getGymById(id: string): Observable<Gym> {
    return this.api.get<Gym>(`/gyms/${id}`);
  }

  getCoaches(filters?: MarketplaceFilters): Observable<Coach[]> {
    return this.api.get<Coach[]>('/coaches');
  }

  getCoachById(id: string): Observable<Coach> {
    return this.api.get<Coach>(`/coaches/${id}`);
  }

  getDoctors(filters?: MarketplaceFilters): Observable<Doctor[]> {
    return this.api.get<Doctor[]>('/doctors');
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.api.get<Doctor>(`/doctors/${id}`);
  }

  getProducts(filters?: MarketplaceFilters): Observable<Product[]> {
    return this.api.get<Product[]>('/products');
  }

  getProductById(id: string): Observable<Product> {
    return this.api.get<Product>(`/products/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.api.get<Category[]>('/categories');
  }

  subscribeToGym(gymId: string, plan: string): Observable<any> {
    return this.api.post('/subscriptions', { gymId, plan });
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.api.post('/cart', { productId, quantity });
  }
}