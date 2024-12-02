import {Component, OnInit} from '@angular/core';
import {MapComponent} from "../../map/map.component";
import {NgFor, NgIf} from "@angular/common";
import {LeftBarComponent} from "../../elements/left-bar/left-bar.component";
import {ActivatedRoute, Router} from "@angular/router";
import { ClienteService } from '../../service/cliente.service';
import { WaypointService } from '../../service/waypoint.service';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-entregas',
  standalone: true,
    imports: [
        MapComponent,
        NgIf,
        NgFor,
        LeftBarComponent
    ],
  templateUrl: './entregas.component.html',
  styleUrl: './entregas.component.css'
})
export class EntregasComponent implements OnInit {
    mapVisible: boolean = true;
    rotasVisible: boolean = false;

    listaDePedidos: any[] = [];

    directions: string[] = [];
    translatedDirections: string[] = [];

    constructor(private _router: Router, private route: ActivatedRoute, private _clienteService: ClienteService, private waypointService: WaypointService, private translationService: TranslationService) {}

    ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.listaDePedidos = params['pedidos']
        ? JSON.parse(params['pedidos'])
        : [];
      
    });
    if (this.listaDePedidos != null && this.listaDePedidos.length > 0) {
      // Atualiza os waypoints no serviço
    this.waypointService.setWaypoints(this.listaDePedidos);

    this._clienteService.getDirections(this.listaDePedidos).subscribe({
      next: async (response) => {  
        this.directions = response.directions;
        console.log(this.directions)

        // Traduza para português do Brasil
        this.translatedDirections = await this.translationService.translate(this.directions);
        
        this.rotasVisible = true;
      },
      error: (err) => {
        console.error('Erro ao receber direções:', err);
      },
    });
  }
  
  }

    listarPedidos() {
      this._router.navigate(['/clientes']);
    }

    /* calcularRotas() {
      this._clienteService.enviarListaDePedidos(this.listaDePedidos).subscribe({
        next: (response) => {
            console.log('Lista de pedidos e coordenadas enviada com sucesso:', response);
            // Aqui você pode processar a resposta do backend, como obter a lista ordenada
        },
        error: (err) => {
            console.error('Erro ao enviar lista de pedidos:', err);
            alert('Erro ao enviar lista de pedidos.');
        }
    });
  } */

}
