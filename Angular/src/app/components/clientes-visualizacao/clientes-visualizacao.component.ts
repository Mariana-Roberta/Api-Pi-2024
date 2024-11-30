import { Component, OnInit } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {LeftBarComponent} from "../../elements/left-bar/left-bar.component";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ClienteService} from "../../service/cliente.service";
import { ActivatedRoute, Router } from '@angular/router';

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
        ReactiveFormsModule
    ],
  templateUrl: './clientes-visualizacao.component.html',
  styleUrl: './clientes-visualizacao.component.css'
})
export class ClientesVisualizacaoComponent implements OnInit {
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

    constructor(private clienteService: ClienteService, private route: ActivatedRoute, private _router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.clienteService.getClienteById(Number(id)).subscribe(
                (dados) => {
                  this.cliente = dados;
                  console.log(this.cliente)
                },
                (error) => {
                  console.error('Erro ao carregar dados do cliente', error);
                }
            );
        }
    }

    voltar(){
        this._router.navigate(['/clientes']);
    }

    /*updateCliente() {
        this.clienteService.addCliente(this.cliente).subscribe({ // UPDATE DO CLIENTE
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
    }*/
}
