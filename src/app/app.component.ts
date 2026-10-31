import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav style="background: #2c3e50; padding: 15px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
      <a routerLink="/" style="color: white; margin: 0 15px; text-decoration: none; font-size: 16px; font-weight: bold;">ثبت نمرات</a>
      <!-- <a routerLink="/table" style="color: white; margin: 0 15px; text-decoration: none; font-size: 16px; font-weight: bold;">جدول اطلاعات</a>
      <a routerLink="/chart" style="color: white; margin: 0 15px; text-decoration: none; font-size: 16px; font-weight: bold;">نمودار معدل‌ها</a> -->
    </nav>
    <main style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}