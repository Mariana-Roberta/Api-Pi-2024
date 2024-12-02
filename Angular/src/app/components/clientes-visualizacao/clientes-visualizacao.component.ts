import { Component, OnInit } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {LeftBarComponent} from "../../elements/left-bar/left-bar.component";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ClienteService} from "../../service/cliente.service";
import { ActivatedRoute, Router } from '@angular/router';
import {NgxMaskDirective} from "ngx-mask";
import {NgIf} from "@angular/common";
import {GeoService} from "../../service/geocoding.service";
import {MapMarkerComponent} from "../../map-marker/map-marker.component";
import {LocationService} from "../../service/location.service";
import {AddressService} from "../../service/address.service";

@Component({
  selector: 'app-clientes-visualizacao',
  standalone: true,
    imports: [
        ButtonDirective,
        LeftBarComponent,
        PrimeTemplate,
        TableModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgIf,
        MapMarkerComponent
    ],
  templateUrl: './clientes-visualizacao.component.html',
  styleUrl: './clientes-visualizacao.component.css'
})
export class ClientesVisualizacaoComponent implements OnInit {
    cliente = {
        id: 0,
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

    constructor(private clienteService: ClienteService, private route: ActivatedRoute, private _router: Router, private geoService: GeoService, private locationService: LocationService, private addressService: AddressService ) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.clienteService.getClienteById(Number(id)).subscribe(
                (dados) => {
                  this.cliente = dados;
                    this.location = {
                        lat: this.cliente.lat,
                        lng: this.cliente.lng
                    };
                  console.log(this.cliente)
                },
                (error) => {
                  console.error('Erro ao carregar dados do cliente', error);
                }
            );
        }

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

    voltar(){
        this._router.navigate(['/clientes']);
    }

    updateCliente() {
        this.clienteService.updateCliente(this.cliente).subscribe({ // UPDATE DO CLIENTE
            next: (response) => {
                if (response) {
                    alert('Cliente atualizado com sucesso!');
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

    deleteCliente() {
        this.clienteService.deleteCliente(this.cliente).subscribe({
            next: (response) => {
                alert('Cliente deletado com sucesso!');
                this._router.navigate(['/clientes']);
            },
            error: (err) => {
                console.error('Erro ao deletar cliente:', err);
                alert('Erro ao deletar cliente.');
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
