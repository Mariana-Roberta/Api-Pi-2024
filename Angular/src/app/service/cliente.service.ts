import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cliente/findAll`).pipe(
      catchError(this.handleError)
    );
  }

  getClienteById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/cliente/${id}`);
  }

  addCliente(cliente: any): Observable<any> {
    /*const token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + token
    });*/
    return this.http.post<any>(`${this.apiUrl}/cliente/save`, cliente/*, { headers }*/).pipe(
      catchError(this.handleError)
    );
  }

  updateCliente(cliente: any): Observable<any> {
    /*const token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + token
    });*/
    return this.http.put<any>(`${this.apiUrl}/cliente/update`, cliente/*, { headers }*/).pipe(
      catchError(this.handleError)
    );
  }

  deleteCliente(cliente: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cliente/delete/${cliente.id}`/*, { headers }*/).pipe(
      catchError(this.handleError)
    );
  }

  // Função para enviar a lista de pedidos para o backend
  enviarListaDePedidos(listaDePedidos: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rotas`, listaDePedidos);
  }

  getDirections(listaDePedidos: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rotas/directions`, listaDePedidos);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = error.error.message; // A mensagem do Spring Boot será recebida aqui
    }
    return throwError(() => errorMessage);
  }
}
