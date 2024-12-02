import { AfterViewInit, Component } from '@angular/core';
import {GeoService} from "../service/geocoding.service";
import {LocationService} from "../service/location.service"; // Importe o serviço

declare let L: any; // Declaração para usar L como global

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  standalone: true,
  styleUrls: ['./map-marker.component.css']
})
export class MapMarkerComponent implements AfterViewInit {

  private currentMarker: any = null; // Variável para armazenar o marcador atual

  constructor(private geocodingService: GeoService, private locationService: LocationService) {}

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    const map = L.map('map-2').setView([-16.7476161, -49.2466723], 15);

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: '../assets/location.png',
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Evento de clique para capturar as coordenadas
    map.on('click', (e: any) => {
      const lat = e.latlng.lat;  // Latitude
      const lng = e.latlng.lng;  // Longitude
      // Atualizar a localização no serviço
      this.locationService.setLocation(lat, lng);
      // Se já existir um marcador, removê-lo
      if (this.currentMarker) {
        map.removeLayer(this.currentMarker); // Remove o marcador anterior
      }

      // Criar o novo marcador
      this.currentMarker = L.marker([lat, lng], { icon: L.Marker.prototype.options.icon })
          .addTo(map)
          .bindPopup(`<b>Coordenadas</b><br>Lat: ${lat}<br>Lng: ${lng}`)
          .openPopup();

      // Chamar o serviço para obter o endereço
      this.geocodingService.getAddressByLatLon(lat, lng).subscribe(
          (response) => {
            if (response && response.display_name) {
              console.log(response.display_name);
              // Aqui você pode usar response.display_name sem risco de erro
            } else {
              console.error("A resposta não contém 'display_name' ou é nula.");
            }
            const address = response.display_name;  // O nome completo do endereço
            this.currentMarker.setPopupContent(`<b>Endereço:</b><br>${address}`);
            console.log('Endereço:', address);
          },
          (error) => {
            console.error('Erro ao buscar o endereço:', error);
            console.log('Erro!!!!!!!', error);
          }
      );
    });
  }
}
