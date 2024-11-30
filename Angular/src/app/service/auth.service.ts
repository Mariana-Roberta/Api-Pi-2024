import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAutenticado: boolean = this.getAuthStatus();
  isAdmin: boolean = this.getAdminStatus();

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private _router: Router) {}

  /*login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, { username, password }, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    });
  }*/

    login(username: string, password: string): Observable<{token: string, roles: string[]}> {
      return this.http.post<{ token: string, roles: string[] }>(`${this.apiUrl}/authenticate`, { username, password })
        .pipe(
          tap(response => {
            // Armazena as informações de autenticação no localStorage
            console.log("login: " + response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('roles', JSON.stringify(response.roles));
            localStorage.setItem('authStatus', JSON.stringify(true));

            const roles = JSON.parse(localStorage.getItem('roles') || '[]');
            if (roles.includes('ROLE_ADMIN')) { this.setAdminStatus(true); }
          })
        );
    }

  // Armazena o token no localStorage e retorna o sub
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private setAdminStatus(adminStatus: boolean): void {
    this.isAdmin = adminStatus;
    localStorage.setItem('adminStatus', JSON.stringify(adminStatus));
  }

  getAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('authStatus') || 'false');
  }

  getAdminStatus(): boolean {
    return JSON.parse(localStorage.getItem('adminStatus') || 'false');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const roles = decodedToken.roles;
      console.log(roles);
      return roles && roles.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_USER';
    }
    return null;
  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/login']);
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
