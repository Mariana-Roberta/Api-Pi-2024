import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      // Importar Leaflet e Routing Machine dinamicamente no lado do cliente
      import('leaflet').then(L => {
        import('leaflet-routing-machine').then(() => {
          this.loadMap(L);
        });
      });
    }
  }

  loadMap(L: any): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Adicionar uma rota usando leaflet-routing-machine
    if (L.Routing) {
      // Configurar a rota
      const control = L.Routing.control({
        waypoints: [
          L.latLng(51.505, -0.09),
          L.latLng(51.515, -0.1)
        ],
        routeWhileDragging: true
      }).addTo(map);
    } else {
      console.error("Leaflet Routing Machine não foi carregado corretamente.");
    }

  }
}

