import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { formatDate } from '@repo/shared-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
      <a routerLink="/auth" style="margin-right: 10px;">Auth MF</a>
      <a routerLink="/dashboard">Dashboard MF</a>
      <span style="float: right;">Today: {{ today }}</span>
    </nav>
    <main style="padding: 1rem;">
      <h1>{{ title() }}</h1>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class App {
  protected readonly title = signal('frontend-shell');
  protected readonly today = formatDate(new Date());
}

