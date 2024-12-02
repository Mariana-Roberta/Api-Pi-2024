import { Component, OnInit } from '@angular/core';
import { GeoService } from '../service/geocoding.service';
import {FormsModule} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
    selector: 'app-geo',
    templateUrl: './geo.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgIf,
        JsonPipe
    ],
    styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {
    coordinates: any;

    address: string = '';
    street: string = '';
    city: string = '';
    bairro: string = '';
    country: string = '';
    errorMessage: string = '';

    constructor(private geoService: GeoService) {}

    ngOnInit(): void {}

    // Chama a função para obter as coordenadas do CEP
    zipCode: any;
    searchCoordinates(zipCode: string) {
        this.geoService.getCoordinatesFromZipCode(zipCode).subscribe(
            (response) => {
                if (response && response.length > 0) {
                    this.coordinates = response[0]; // Pega a primeira correspondência
                } else {
                    console.error('Nenhuma coordenada encontrada');
                }
            },
            (error) => {
                console.error('Erro ao obter coordenadas:', error);
            }
        );
    }

    searchAddress() {
        this.geoService.getAddressByComponents(this.street, this.city, this.country).subscribe(
            (response) => {
                if (response.error) {
                    this.errorMessage = response.error;
                } else {
                    this.address = response;
                    this.errorMessage = ''; // Clear any previous error message
                }
            },
            (error) => {
                this.errorMessage = 'An error occurred while fetching the address.';
                console.error('Error retrieving address:', error);
            }
        );
    }
}
