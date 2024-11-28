import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeoService {

    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    // Função para buscar coordenadas a partir do CEP
    getCoordinatesFromZipCode(zipCode: string): Observable<any> {
        const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=Brazil&format=json`;
        return this.http.get<any>(url);
    }

    getAddressByLatLon(lat: number, lon: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAddressByLatLon/${lat}/${lon}`);
    }

    getAddressByComponents(street: string, city: string, country: string): Observable<any> {
        const params = new HttpParams()
            .set('street', street)
            .set('city', city)
            .set('postalCode', country);

        return this.http.get<any>(`${this.apiUrl}/geocode/adress`, { params }).pipe(
            catchError(error => {
                console.error('Error in geocoding:', error);
                return of({ error: 'Unable to retrieve address for the given components.' });
            })
        );
    }
}
