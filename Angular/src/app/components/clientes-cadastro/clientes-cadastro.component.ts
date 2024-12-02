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
import {AddressService} from "../../service/address.service";
import {NgxMaskDirective} from "ngx-mask";

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
        NgIf,
        NgxMaskDirective
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

    address: any;

    constructor(private _router: Router, private clienteService: ClienteService, private geoService: GeoService, private locationService: LocationService, private addressService: AddressService ) {
    }

    ngOnInit(): void {
        this.locationService.location$.subscribe((location) => {
            this.location = location;
        });

        this.addressService.address$.subscribe((address) => {
            this.address = address;
            console.log('Endereço recebido:', this.address);

            // Preenche automaticamente os campos do cliente
            if (this.address) {
                this.cliente.logradouro = this.address.road || '';
                this.cliente.bairro = this.address.suburb || '';
                this.cliente.cep = this.address.postcode || '';
                this.cliente.numero = 'S/N';
            }
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
                if (err.status === 400) {
                    // Extraindo a mensagem do erro
                    const errorMessage = err.error?.message || 'Erro desconhecido';
                    console.error('Erro ao cadastrar cliente:', errorMessage);
                    alert(`Erro: ${errorMessage}`);
                } else {
                    console.error('Erro inesperado:', err);
                    alert('Ocorreu um erro inesperado. Tente novamente.');
                }
            }
        });
    }

    coordinates: any;
    semCep: string = '';

    searchCoordinates(zipCode: string) {
        this.geoService.getCoordinatesFromZipCode(zipCode).subscribe(
            (response) => {
                console.log('RESPONSE:', response); // Verifica a resposta completa

                if (response && response.length > 0) {
                    const addressData = response[0]; // Seleciona o primeiro resultado

                    // Dividir o display_name em partes
                    const addressParts = addressData.display_name.split(',').map((part: string) => part.trim());

                    // Preencher os campos baseados na posição no array
                    this.cliente.cep = addressParts[0] || ''; // Primeiro item (CEP)
                    this.cliente.logradouro = addressParts[1] || '';
                    this.cliente.bairro = addressParts[1] || ''; // Segundo item (Bairro/Subdivisão)
                    this.cliente.numero = 'S/N';

                    this.coordinates = {
                        lat: addressData.lat,
                        lng: addressData.lon
                    };

                    this.semCep = ''; // Limpa mensagens de erro anteriores
                    console.log('Endereço extraído:', this.cliente);
                } else {
                    console.error('Nenhum endereço encontrado para o CEP');
                    this.semCep = 'Nenhum endereço encontrado para o CEP informado.';
                }
            },
            (error) => {
                console.error('Erro ao obter coordenadas:', error); // Detalhes do erro
                this.semCep = 'Erro ao buscar endereço. Utilize o mapa para marcar sua localização.';
            }
        );
    }

}
