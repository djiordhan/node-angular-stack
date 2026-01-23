import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { formatDate } from '@repo/shared-utils';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="shell-container">
      <nav class="navbar">
        <div class="nav-brand">
          <span class="logo">🚀 StackApp</span>
        </div>
        
        <div class="nav-links">
          <a *ngIf="isAuthenticated()" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a *ngIf="isAuthenticated()" routerLink="/auth" routerLinkActive="active">Permissions</a>
        </div>

        <div class="nav-user">
          <ng-container *ngIf="isAuthenticated(); else loginBtn">
            <div class="user-info">
              <div class="user-details">
                <span class="username">{{ currentUser()?.username }}</span>
                <span class="role">{{ currentUser()?.role }}</span>
              </div>
              <button (click)="logout()" class="logout-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
              </button>
            </div>
          </ng-container>
          <ng-template #loginBtn>
            <a routerLink="/login" class="login-btn">Sign In</a>
          </ng-template>
        </div>
      </nav>

      <main class="content">
        <div *ngIf="isLoading()" class="loading-overlay">
          <div class="spinner"></div>
        </div>
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <span>{{ today }}</span>
        <span>Built with Angular & Node.js</span>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
    }
    .shell-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #f9fafb;
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 64px;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      z-index: 100;
    }
    .nav-brand .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: #6366f1;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    .nav-links a {
      text-decoration: none;
      color: #4b5563;
      font-weight: 500;
      transition: color 0.2s;
      padding: 0.5rem 0;
      border-bottom: 2px solid transparent;
    }
    .nav-links a:hover {
      color: #6366f1;
    }
    .nav-links a.active {
      color: #6366f1;
      border-bottom-color: #6366f1;
    }
    .nav-user {
      display: flex;
      align-items: center;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .user-details {
      display: flex;
      flex-direction: column;
      text-align: right;
    }
    .username {
      font-size: 0.875rem;
      font-weight: 600;
    }
    .role {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: capitalize;
    }
    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    .logout-btn:hover {
      background: #fee2e2;
      color: #dc2626;
      border-color: #fecaca;
    }
    .login-btn {
      padding: 0.5rem 1.25rem;
      background: #6366f1;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: opacity 0.2s;
    }
    .login-btn:hover {
      opacity: 0.9;
    }
    .content {
      flex: 1;
      position: relative;
    }
    .footer {
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #9ca3af;
      background: white;
      border-top: 1px solid #f3f4f6;
    }
    .loading-overlay {
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 50;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class App {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;
  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly isLoading = this.authService.isLoading;
  protected readonly today = formatDate(new Date());

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

