import { Component, OnInit } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {LeftBarComponent} from "../../elements/left-bar/left-bar.component";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-clientes-lista',
  standalone: true,
    imports: [
        ButtonDirective,
        PrimeTemplate,
        TableModule,
        LeftBarComponent,
        NgIf
    ],
  templateUrl: './clientes-lista.component.html',
  styleUrl: './clientes-lista.component.css'
})
export class ClientesListaComponent implements OnInit {

    clientes: any [] = [];

    listaDePedidos: any [] = [];

    constructor(private _router: Router, private _clienteService: ClienteService) {
    }

    ngOnInit(): void {
        this._clienteService.getClientes().subscribe(
            (response) => {
                console.log(response);
              this.clientes = response;
            },
            (error) => {
              console.log(error);
            }
          );
    }

    cadastrarClientes() {
        this._router.navigate(['/clientes-cadastro']);
    }

    visualizarCliente(id: number) {
        this._router.navigate(['/clientes-visualizacao', id]);
    }

    adicionarAListaDePedidos(cliente: any) {
    
        // Verifica se o cliente já está na lista pelo ID
        const clienteExiste = this.listaDePedidos.some((pedido) => pedido.id === cliente.id);
    
        if (!clienteExiste) {
            this.listaDePedidos = [...this.listaDePedidos, cliente]; // Cria uma nova referência do array
            // console.log('Cliente adicionado à lista:', cliente);
        } else {
            alert('Cliente já está na lista!');
        }
    }
    

    removerDaListaDePedidos(pedido: any) {
        this.listaDePedidos = this.listaDePedidos.filter(p => p.id !== pedido.id);
      }

    confirmarPedidos() {

    }

}
