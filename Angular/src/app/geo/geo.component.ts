import { Component, OnInit } from '@angular/core';
import { GeoService } from '../service/geocoding.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-geo',
    templateUrl: './geo.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
    styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {
    coordinates: any;

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
}
