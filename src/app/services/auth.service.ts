import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  handleLoginSuccess(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/']);
  }

  logout(): void {
  localStorage.removeItem('token');
  this.isLoggedInSubject.next(false);

  const currentUrl = this.router.url;
  const protectedRoutes = ['/profile'];

  if (protectedRoutes.includes(currentUrl)) {
    this.router.navigate(['/']);
  }
}


  private hasToken(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
