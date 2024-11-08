import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, { username, password }, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    });
  }

  // Armazena o token no localStorage e retorna o sub
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ROLE_ADMIN';
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const roles = decodedToken.roles;
      console.log(roles);
      return roles && roles.includes('ROLE_ROLE_ADMIN') ? 'ROLE_ROLE_ADMIN' : 'ROLE_ROLE_USER';
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
