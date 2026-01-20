import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>MF-Dashboard: Welcome</h2>
      <p>This is the dashboard microfrontend.</p>
      <ul>
        <li>Stat 1: 100</li>
        <li>Stat 2: 200</li>
      </ul>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; border: 1px solid #007bff; border-radius: 8px; }
  `]
})
export class DashboardComponent {}
