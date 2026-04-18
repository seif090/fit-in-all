import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MarketplaceService, Gym, Coach, Product } from '../../../core/services/marketplace.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-text-primary mb-4">نتائج البحث</h1>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <input type="text" [(ngModel)]="searchQuery" (input)="onSearch()"
                     placeholder="ابحث عن صالات، مدربين، منتجات..."
                     class="input" />
            </div>
            <select [(ngModel)]="filterCategory" (change)="onSearch()" class="input sm:w-48">
              <option value="">كل الفئات</option>
              <option value="gyms">صالات رياضية</option>
              <option value="coaches">مدربين</option>
              <option value="products">منتجات</option>
            </select>
          </div>

          @if (searchQuery()) {
            <p class="text-text-secondary mt-4">
              نتائج البحث عن: "<span class="font-medium">{{ searchQuery() }}</span>"
              ({{ results().length }} نتيجة)
            </p>
          }
        </div>

        @if (loading()) {
          <div class="flex justify-center py-12">
            <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        } @else {
          @if (results().length === 0) {
            <div class="card text-center py-12">
              <div class="text-6xl mb-4">🔍</div>
              <h2 class="text-xl font-semibold mb-2">لا توجد نتائج</h2>
              <p class="text-text-secondary mb-6">جرب كلمات مفتاحية مختلفة</p>
              <a routerLink="/marketplace" class="btn-primary">تصفح السوق</a>
            </div>
          } @else {
            <!-- Tabs -->
            <div class="flex gap-2 mb-6 overflow-x-auto">
              <button (click)="activeTab = 'all'" 
                      [class]="activeTab === 'all' ? 'btn-primary' : 'btn-secondary'">
                الكل ({{ results().length }})
              </button>
              <button (click)="activeTab = 'gyms'" 
                      [class]="activeTab === 'gyms' ? 'btn-primary' : 'btn-secondary'">
                صالات ({{ gyms().length }})
              </button>
              <button (click)="activeTab = 'coaches'" 
                      [class]="activeTab === 'coaches' ? 'btn-primary' : 'btn-secondary'">
                مدربين ({{ coaches().length }})
              </button>
              <button (click)="activeTab = 'products'" 
                      [class]="activeTab === 'products' ? 'btn-primary' : 'btn-secondary'">
                منتجات ({{ products().length }})
              </button>
            </div>

            <!-- Results Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (item of getFilteredResults(); track item.id) {
                @if (item.type === 'gym') {
                  <a [routerLink]="['/gym', item.id]" class="card group">
                    <div class="h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">صالة رياضية</span>
                    <h3 class="font-semibold mt-2 mb-1">{{ item.name }}</h3>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <span class="text-secondary">★</span>
                        <span class="mr-1 text-sm">{{ item.rating }}</span>
                      </div>
                      <span class="text-primary font-bold">{{ item.price }}</span>
                    </div>
                  </a>
                }
                @if (item.type === 'coach') {
                  <a [routerLink]="['/coach', item.id]" class="card">
                    <div class="flex items-center gap-4 mb-4">
                      <div class="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 class="font-semibold">{{ item.name }}</h3>
                        <p class="text-sm text-text-secondary">{{ item.specialty }}</p>
                      </div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <span class="text-secondary">★</span>
                        <span class="mr-1 text-sm">{{ item.rating }}</span>
                      </div>
                      <span class="text-primary font-bold">{{ item.price }}</span>
                    </div>
                  </a>
                }
                @if (item.type === 'product') {
                  <a [routerLink]="['/product', item.id]" class="card group">
                    <div class="h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <span class="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">منتج</span>
                    <h3 class="font-semibold mt-2 mb-1">{{ item.name }}</h3>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <span class="text-secondary">★</span>
                        <span class="mr-1 text-sm">{{ item.rating }}</span>
                      </div>
                      <span class="text-primary font-bold">{{ item.price }}</span>
                    </div>
                  </a>
                }
              }
            </div>
          }
        }
      </div>
    </div>
  `
})
export class SearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private marketplaceService = inject(MarketplaceService);

  loading = signal(true);
  searchQuery = signal('');
  filterCategory = '';
  activeTab = 'all';

  results = signal<any[]>([]);
  gyms = signal<any[]>([]);
  coaches = signal<any[]>([]);
  products = signal<any[]>([]);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery.set(params['q']);
        this.performSearch(params['q']);
      } else {
        this.loadMockData();
      }
    });
  }

  onSearch() {
    if (this.searchQuery()) {
      this.performSearch(this.searchQuery());
    } else {
      this.loadMockData();
    }
  }

  performSearch(query: string) {
    this.loading.set(true);
    const q = query.toLowerCase();

    this.gyms.set([
      { id: '1', type: 'gym', name: 'صالة اللياقة الذهبية', rating: 4.8, price: '299 ر.س/شهر', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400' },
      { id: '2', type: 'gym', name: 'فيتنس بلس', rating: 4.6, price: '249 ر.س/شهر', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400' },
    ].filter(g => g.name.toLowerCase().includes(q)));

    this.coaches.set([
      { id: '1', type: 'coach', name: 'أحمد محمد', specialty: 'مدرب شخصي', rating: 4.9, price: '200 ر.س', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200' },
    ].filter(c => c.name.toLowerCase().includes(q) || c.specialty?.toLowerCase().includes(q)));

    this.products.set([
      { id: '1', type: 'product', name: 'بروتين واي', rating: 4.7, price: '189 ر.س', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400' },
    ].filter(p => p.name.toLowerCase().includes(q)));

    this.results.set([...this.gyms(), ...this.coaches(), ...this.products()]);
    this.loading.set(false);
  }

  loadMockData() {
    this.gyms.set([
      { id: '1', type: 'gym', name: 'صالة اللياقة الذهبية', rating: 4.8, price: '299 ر.س/شهر', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400' },
      { id: '2', type: 'gym', name: 'فيتنس بلس', rating: 4.6, price: '249 ر.س/شهر', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400' },
      { id: '3', type: 'gym', name: 'جym برو', rating: 4.9, price: '399 ر.س/شهر', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400' },
    ]);

    this.coaches.set([
      { id: '1', type: 'coach', name: 'أحمد محمد', specialty: 'مدرب شخصي', rating: 4.9, price: '200 ر.س', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200' },
      { id: '2', type: 'coach', name: 'سارة علي', specialty: 'أخصائية تغذية', rating: 5.0, price: '150 ر.س', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200' },
    ]);

    this.products.set([
      { id: '1', type: 'product', name: 'بروتين واي', rating: 4.7, price: '189 ر.س', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400' },
      { id: '2', type: 'product', name: 'كرياتين', rating: 4.5, price: '99 ر.س', image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400' },
    ]);

    this.results.set([...this.gyms(), ...this.coaches(), ...this.products()]);
    this.loading.set(false);
  }

  getFilteredResults() {
    switch (this.activeTab) {
      case 'gyms': return this.gyms();
      case 'coaches': return this.coaches();
      case 'products': return this.products();
      default: return this.results();
    }
  }
}