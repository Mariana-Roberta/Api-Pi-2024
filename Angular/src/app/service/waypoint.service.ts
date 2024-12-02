import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WaypointService {
  private waypoints: { lat: number; lng: number }[] = [];

  setWaypoints(listaDePedidos: any[]) {
    this.waypoints = listaDePedidos.map((pedido) => {
        if (pedido.lat == null || pedido.lng == null) {
          console.warn('Pedido com coordenadas inválidas:', pedido);
        }
        return {
          lat: pedido.lat,
          lng: pedido.lng,
        };
      });
  }
  getWaypoints() {
    return this.waypoints;
  }
}
