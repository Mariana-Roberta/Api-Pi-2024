import {AfterViewInit, Component, Input} from '@angular/core';
import { WaypointService } from '../service/waypoint.service';

declare let L: any; // Declaração para usar L como global

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input() waypoints: { lat: number; lng: number }[] = []; // Define o Input

  constructor(private waypointService: WaypointService) {}

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    const map = L.map('map').setView([-16.7476161, -49.2466723], 15);

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: '../assets/location.png',
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const interval = setInterval(() => {
      const waypoints = this.waypointService.getWaypoints();
  
      if (waypoints.length > 0) {
        console.log('Atualizando rotas com waypoints:', waypoints);
        L.Routing.control({
          waypoints: waypoints.map((point) => L.latLng(point.lat, point.lng)),
          routeWhileDragging: true,
        }).addTo(map);
  
        clearInterval(interval); // Para de verificar após carregar
      }
    }, 500); // Verifica a cada 500ms
}

  }
