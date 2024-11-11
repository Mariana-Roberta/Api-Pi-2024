import { Component } from '@angular/core';
import {SidebarComponent} from "../page-elements/sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        SidebarComponent
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}