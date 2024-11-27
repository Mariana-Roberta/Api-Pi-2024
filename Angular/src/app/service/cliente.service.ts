import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cliente/findAll`).pipe(
        catchError(this.handleError<any[]>('getClientes', [])));;
  }

  getClienteById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/cliente/${id}`);
  }

  addCliente(cliente: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/cliente/save`, cliente, { headers });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
