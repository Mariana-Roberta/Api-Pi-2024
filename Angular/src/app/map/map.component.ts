import {AfterViewInit, Component} from '@angular/core';

declare let L: any; // Declaração para usar L como global

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: '../assets/location.png',
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Adicionar uma rota usando leaflet-routing-machine
    L.Routing.control({
      waypoints: [
        L.latLng(51.505, -0.09),
        L.latLng(51.515, -0.1),
        L.latLng(51.515, -0.14)
      ],
      routeWhileDragging: true
    }).addTo(map);

  }
}
