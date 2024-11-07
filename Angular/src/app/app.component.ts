import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./service/auth.service";
import {AuthGuard} from "./guard/auth.guard";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api-pi-2024';
}
