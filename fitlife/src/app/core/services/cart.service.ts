import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSignal = signal<CartItem[]>([]);
  
  items = computed(() => this.cartSignal());
  itemCount = computed(() => this.cartSignal().reduce((sum, item) => sum + item.quantity, 0));
  total = computed(() => this.cartSignal().reduce((sum, item) => sum + (item.price * item.quantity), 0));

  constructor(private api: ApiService) {
    this.loadCart();
  }

  private loadCart() {
    const savedCart = localStorage.getItem('fitlife_cart');
    if (savedCart) {
      this.cartSignal.set(JSON.parse(savedCart));
    }
  }

  private saveCart() {
    localStorage.setItem('fitlife_cart', JSON.stringify(this.cartSignal()));
  }

  addItem(product: { id: string; name: string; price: number; image: string }, quantity = 1) {
    const currentItems = this.cartSignal();
    const existingItem = currentItems.find(item => item.productId === product.id);

    if (existingItem) {
      this.cartSignal.set(
        currentItems.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      this.cartSignal.set([
        ...currentItems,
        {
          id: crypto.randomUUID(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image
        }
      ]);
    }
    this.saveCart();
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }
    this.cartSignal.set(
      this.cartSignal().map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
    this.saveCart();
  }

  removeItem(itemId: string) {
    this.cartSignal.set(this.cartSignal().filter(item => item.id !== itemId));
    this.saveCart();
  }

  clearCart() {
    this.cartSignal.set([]);
    this.saveCart();
  }

  checkout(): Observable<any> {
    return this.api.post('/orders', {
      items: this.cartSignal().map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      total: this.total()
    });
  }

  getCartFromServer(): Observable<Cart> {
    return this.api.get<Cart>('/cart');
  }

  syncCart() {
    this.getCartFromServer().subscribe({
      next: (cart) => {
        this.cartSignal.set(cart.items);
        this.saveCart();
      },
      error: () => {}
    });
  }
}