import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <h2>MF-Auth: Login</h2>
      <p>This is a microfrontend component.</p>
      <button (click)="login()">Login</button>
    </div>
  `,
  styles: [`
    .login-container { padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
  `]
})
export class LoginComponent {
  login() {
    console.log('Login clicked');
  }
}
