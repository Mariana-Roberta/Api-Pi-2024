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
              this.clientes = response;
            },
            (error) => {
              console.log(error);
            }
          );
    }

    products = [
        { name: 'Apple', category: 'Fruit', price: 1.2 },
        { name: 'Carrot', category: 'Vegetable', price: 0.9 },
        { name: 'Chicken', category: 'Meat', price: 5.5 },
        { name: 'Milk', category: 'Dairy', price: 2.0 },
        { name: 'Orange', category: 'Fruit', price: 1.5 },
        { name: 'Cheese', category: 'Dairy', price: 4.3 },
        { name: 'Steak', category: 'Meat', price: 12.5 },
        { name: 'Broccoli', category: 'Vegetable', price: 1.1 }
    ];


    cadastrarClientes() {
        this._router.navigate(['/clientes-cadastro']);
    }

    visualizarCliente(id: number) {
        this._router.navigate(['/clientes-cadastro']);
    }

    adicionarAListaDePedidos(cliente: any) {
        // Verifica se o cliente já está na lista
        const clienteExiste = this.listaDePedidos.some((pedido) => pedido.name === cliente.name);

        if (!clienteExiste) {
            this.listaDePedidos = [...this.listaDePedidos, cliente]; // Cria uma nova referência do array
        } else {
            alert('Cliente já está na lista!');
        }
    }

    removerDaListaDePedidos(cliente: any) {
        // Remove o cliente filtrando a lista
        this.listaDePedidos = this.listaDePedidos.filter((pedido) => pedido.name !== cliente.name);
    }

    confirmarPedidos() {

    }

}
