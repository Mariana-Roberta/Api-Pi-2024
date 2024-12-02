import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent {

  constructor(private _router: Router, private _authService: AuthService) {
  }

  entregas() {
    this._router.navigate(['/entregas']);
  }

  clientes() {
    this._router.navigate(['/clientes']);
  }

  logout() {
    this._authService.logout();
  }
}
