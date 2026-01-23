import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <div class="login-header">
          <h1>Welcome Back</h1>
          <p>Login to your account to continue</p>
        </div>
        
        <form (submit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              [(ngModel)]="credentials.username" 
              required 
              placeholder="Enter your username"
              #username="ngModel"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="credentials.password" 
              required 
              placeholder="••••••••"
              #password="ngModel"
            >
          </div>

          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" [disabled]="loginForm.invalid || loading" class="login-button">
            <span *ngIf="!loading">Sign In</span>
            <span *ngIf="loading" class="loader"></span>
          </button>
        </form>
        
        <div class="login-footer">
          <p>Don't have an account? <a href="#">Create one</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 20px;
    }
    .login-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }
    .login-header h1 {
      margin: 0;
      font-size: 2rem;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .login-header p {
      color: #6b7280;
      margin-top: 8px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }
    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.2s;
      box-sizing: border-box;
    }
    .form-group input:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    }
    .error-message {
      background: #fef2f2;
      color: #dc2626;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 0.875rem;
      text-align: center;
    }
    .login-button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.2s, opacity 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login-button:hover:not(:disabled) {
      transform: translateY(-1px);
      opacity: 0.95;
    }
    .login-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .login-footer {
      margin-top: 25px;
      text-align: center;
      font-size: 0.875rem;
      color: #6b7280;
    }
    .login-footer a {
      color: #6366f1;
      text-decoration: none;
      font-weight: 500;
    }
    .loader {
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      animation: rotation 1s linear infinite;
    }
    @keyframes rotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  credentials = {
    username: '',
    password: ''
  };
  
  loading = false;
  error = '';

  onSubmit() {
    this.loading = true;
    this.error = '';
    
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Invalid username or password';
        console.error('Login error', err);
      }
    });
  }
}
