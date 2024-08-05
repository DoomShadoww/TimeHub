import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiUrl = 'https://project-shadow-114817bd8a68.herokuapp.com';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }


  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(`${this.apiUrl}/users`, user, { headers });
  }

  updateUser(id: number, user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put(`${this.apiUrl}/users/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers });
  }
}
