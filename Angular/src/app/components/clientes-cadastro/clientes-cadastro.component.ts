import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {LeftBarComponent} from "../../elements/left-bar/left-bar.component";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MapMarkerComponent} from "../../map-marker/map-marker.component";
import {ClienteService} from "../../service/cliente.service";
import {Router} from "@angular/router";
import {LocationService} from "../../service/location.service";
import {NgIf} from "@angular/common";
import {GeoService} from "../../service/geocoding.service";

@Component({
  selector: 'app-clientes-cadastro',
  standalone: true,
    imports: [
        ButtonDirective,
        LeftBarComponent,
        PrimeTemplate,
        TableModule,
        FormsModule,
        InputTextModule,
        MapMarkerComponent,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './clientes-cadastro.component.html',
  styleUrl: './clientes-cadastro.component.css'
})
export class ClientesCadastroComponent implements OnInit {
    cliente = {
        nome: '',
        email: '',
        telefone: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        lat: 0,
        lng: 0
    };

    location: { lat: number; lng: number } | null = null;

    constructor(private _router: Router, private clienteService: ClienteService, private geoService: GeoService, private locationService: LocationService) {
    }

    ngOnInit(): void {
        this.locationService.location$.subscribe((location) => {
            this.location = location;
        });
    }

    cadastrarCliente() {
        if (this.location) {
            this.cliente.lat = this.location.lat;
            this.cliente.lng = this.location.lng;
        }
        this.clienteService.addCliente(this.cliente).subscribe({
            next: (response) => {
                if (response) {
                    console.log('Cliente cadastrado com sucesso:', response);
                    alert('Cliente cadastrado com sucesso!');
                    this._router.navigate(['/clientes']);
                } else {
                    throw new Error('Resposta vazia do servidor');
                }
            },
            error: (err) => {
                console.error('Erro ao cadastrar cliente:', err);
                console.log(err);
                alert('Erro ao cadastrar cliente.');
            }
        });
    }

    coordinates: any;
    semCep: string = '';

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
                this.semCep = 'Cep não encontrado. Utilize o mapa para marcar sua localização.';
            }
        );
    }
}
