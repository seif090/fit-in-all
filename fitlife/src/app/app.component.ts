import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BottomNavComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-background flex flex-col">
      <app-navbar />
      <main class="flex-1 pb-20 lg:pb-4">
        <router-outlet />
      </main>
      <app-footer />
      <app-bottom-nav />
    </div>
  `
})
export class AppComponent {}