import { Component } from '@angular/core';
import {SidebarComponent} from "../page-elements/sidebar/sidebar.component";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        SidebarComponent,
        MapComponent
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
