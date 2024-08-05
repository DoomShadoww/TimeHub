// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://project-shadow-114817bd8a68.herokuapp.com';
  private token: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  public isLoggedIn = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  public register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
    console.log('Token guardado:', token);
    this.loggedIn.next(true);
  }

  public getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    console.log('Token obtenido:', this.token);
    return this.token;
  }

  public getUsers(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    console.log('Headers:', headers);
    return this.http.get(`${this.baseUrl}/users`, { headers });
  }

  private hasToken(): boolean {
    this.token = localStorage.getItem('authToken');
    return !!this.token;
  }

  public logout(): void {
    localStorage.removeItem('authToken');
    this.token = null;
    this.loggedIn.next(false);
  }

  public resetPassword(username: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { username, token, newPassword });
  }


  public requestPasswordReset(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { username });
  }
}
