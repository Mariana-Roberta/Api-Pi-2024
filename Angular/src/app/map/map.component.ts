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

    //const marker = L.marker([-16.7476161, -49.2466723], { icon: L.Marker.prototype.options.icon }).addTo(map);

    //marker.bindPopup('<b>Meu marcador!</b><br>Este é um marcador com ícone personalizado.').openPopup(); // possível colocar com o endereço por extenso

    // Adicionar uma rota usando leaflet-routing-machine
    L.Routing.control({
      waypoints: [
        L.latLng(-16.7476161, -49.2466723),
        L.latLng(-16.7476161, -49.25),
        L.latLng(-16.7476161, -49.26)
      ],
      routeWhileDragging: true
    }).addTo(map);

  }
}
