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

    clienteAdmin: any;
    clientes: any [] = [];

    listaDePedidos: any [] = [];

    constructor(private _router: Router, private _clienteService: ClienteService) {
    }

    /*ngOnInit(): void {
        this._clienteService.getClientes().subscribe(
          (response) => {
            console.log(response);
            this.clienteAdmin = response.filter((cliente: any) => cliente.id == 1);
            this.clientes = response.filter((cliente: any) => cliente.id > 1);
            this.listaDePedidos.push(this.clienteAdmin);
          },
          (error) => {
            console.log(error);
          }
        );
      }*/
        ngOnInit(): void {
          this._clienteService.getClientes().subscribe(
              (response) => {
                  // Filtra os clientes
                  this.clienteAdmin = response.filter((cliente: any) => cliente.id == 1);
                  this.clientes = response.filter((cliente: any) => cliente.id > 1);
      
                  // Adiciona os itens de clienteAdmin à listaDePedidos
                  this.listaDePedidos.push(...this.clienteAdmin);
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

    /*confirmarPedidos() {
        //this._router.navigate(['/entregas'], { queryParams: { pedidos: JSON.stringify(this.listaDePedidos) } });
        this._clienteService.enviarListaDePedidos(this.listaDePedidos).subscribe({
            next: (response) => {
                this._router.navigate(['/entregas'], { queryParams: { pedidos: JSON.stringify(this.listaDePedidos) } });
            },
            error: (err) => {
                console.error('Erro ao enviar lista de pedidos:', err);
                alert('Erro ao enviar lista de pedidos.');
            }
        }); 
    }*/

        confirmarPedidos() {
          this._clienteService.enviarListaDePedidos(this.listaDePedidos).subscribe({
              next: (response) => {
                  // Extrair a lista de clientes reorganizada da resposta
                  const orderedClients = response.orderedClients;
      
                  if (orderedClients) {
                      console.log('Lista reorganizada recebida:', orderedClients);
                      this.listaDePedidos = orderedClients; // Atualiza a lista de pedidos no front-end
                      this._router.navigate(['/entregas'], { queryParams: { pedidos: JSON.stringify(orderedClients) } });
                  } else {
                      console.error('Resposta do backend não contém a lista reorganizada.');
                  }
              },
              error: (err) => {
                  console.error('Erro ao enviar lista de pedidos:', err);
                  alert('Erro ao enviar lista de pedidos.');
              }
          });
      }

}
