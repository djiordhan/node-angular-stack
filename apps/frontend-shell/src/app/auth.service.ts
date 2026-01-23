import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, AuthResponse } from '@repo/shared-types';
import { tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';
  
  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = signal<boolean>(false);
  readonly isLoading = signal<boolean>(true);

  constructor(private http: HttpClient) {
    this.checkAuth();
  }

  checkAuth() {
    this.http.get<User>(`${this.apiUrl}/me`, { withCredentials: true })
      .subscribe({
        next: (user) => {
          this.currentUser.set(user);
          this.isAuthenticated.set(true);
          this.isLoading.set(false);
        },
        error: () => {
          this.currentUser.set(null);
          this.isAuthenticated.set(false);
          this.isLoading.set(false);
        }
      });
  }

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(res => {
          this.currentUser.set(res.user);
          this.isAuthenticated.set(true);
        })
      );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUser.set(null);
          this.isAuthenticated.set(false);
        }),
        catchError(err => {
          console.error('Logout failed', err);
          return of(null);
        })
      );
  }
}
