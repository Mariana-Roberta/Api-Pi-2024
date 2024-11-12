import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeoService {

    constructor(private http: HttpClient) {}

    // Função para buscar coordenadas a partir do CEP
    getCoordinatesFromZipCode(zipCode: string): Observable<any> {
        const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=Brazil&format=json`;
        return this.http.get<any>(url);
    }
}
