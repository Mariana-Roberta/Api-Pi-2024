import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./service/auth.service";
import {authGuard} from "./guard/auth.guard";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api-pi-2024';
}
