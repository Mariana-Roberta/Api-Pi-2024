import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ClienteService} from "../service/cliente.service";
import {MapComponent} from "../map/map.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {MapMarkerComponent} from "../map-marker/map-marker.component";

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [
    NgIf,
    MapComponent,
    FormsModule,
    InputTextModule,
    ButtonDirective,
    TableModule,
    MapMarkerComponent
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent implements OnInit{
  constructor(private clienteService: ClienteService) {
  }

  entregasVisible: boolean = true;
  clientesVisible: boolean = false;
  cadastroClientesVisible: boolean = false;

  mapVisible: boolean = true;
  rotasVisible: boolean = false;

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

  ngOnInit(): void {
    this.mapVisible = true;
    this.rotasVisible = false;
    this.entregasVisible = true;
    this.clientesVisible = false;
    this.cadastroClientesVisible = false;
  }

  toggleView(selectedOption: string) {
    this.mapVisible = selectedOption === 'opt-1';
    this.rotasVisible = selectedOption === 'opt-2';
  }

  toggleMain(entregas: boolean, clientes: boolean, cadastro: boolean) {
    this.entregasVisible = entregas;
    this.clientesVisible = clientes;
    this.cadastroClientesVisible = cadastro;
    console.log("OIIIIIIII")
    console.log(this.entregasVisible)
    console.log(this.clientesVisible)
    console.log(this.cadastroClientesVisible)
  }

  cliente = {
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: ''
  };

  /*onSubmit() {
    //this.toggleMain(false, true, false);
    this.clienteService.addCliente(this.cliente).subscribe({
      next: (response) => {
        if (response) {
          console.log('Cliente cadastrado com sucesso:', response);
          alert('Cliente cadastrado com sucesso!');
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
    //console.log('Usuário cadastrado:', this.cliente);
  }*/

  abrirDetalhesDoUsuario() {

  }

  realizarPedidoDoUsuario() {

  }
}
