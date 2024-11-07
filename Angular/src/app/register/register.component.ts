import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      InputTextModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fullName: string = '';
  username: string = ''; // Email
  password: string = '';
  confirmPassword: string = '';

  constructor(private _router: Router) { }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // Lógica de registro (envio para o backend, validações adicionais, etc.)
    console.log('Registrando usuário:', this.username);
  }

  onNavigateToLogin() {
    // Lógica para navegar de volta para a página de login
    console.log('Navegando para o login...');
    this._router.navigate(['/login']);
  }
}
