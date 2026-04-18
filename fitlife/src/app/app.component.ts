import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BottomNavComponent],
  template: `
    <div class="min-h-screen bg-background">
      <app-navbar />
      <main class="pb-20 lg:pb-4">
        <router-outlet />
      </main>
      <app-bottom-nav />
    </div>
  `
})
export class AppComponent {}