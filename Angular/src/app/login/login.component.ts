import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {DividerModule} from "primeng/divider";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private _authService: AuthService, private _router: Router) {
  }

  onLogin(): void {
    this._authService.login(this.username, this.password).subscribe(
      (token) => {
        this._authService.setToken(token);

        if (this._authService.isAdmin()) {
          this._router.navigate(['/register']);
        } else {
          this._router.navigate(['/home']); // Ou outra rota para usuários comuns
        }
      },
      (error) => {
        // Manipule o erro de login (ex.: credenciais incorretas)
        this.errorMessage = 'Login ou senha inválidos. Tente novamente.';
        console.log(error);
        console.log(this.errorMessage);
      }
    );
  }
}
