import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressSubject = new BehaviorSubject<any>(null); // Inicializa com null
  address$ = this.addressSubject.asObservable(); // Expondo o Observable para outros componentes

  setAddress(address: any): void {
    this.addressSubject.next(address); // Atualiza o endereço
  }

  getAddress(): any {
    return this.addressSubject.value; // Obtém o valor atual do endereço
  }
}
