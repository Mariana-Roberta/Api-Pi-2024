import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./guard/auth.guard";
import {adminGuard} from "./guard/admin.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MapComponent} from "./map/map.component";
import {GeoComponent} from "./geo/geo.component";
import {TestingComponent} from "./testing/testing.component";
import {EntregasComponent} from "./components/entregas/entregas.component";
import {LeftBarComponent} from "./elements/left-bar/left-bar.component";
import {ClientesListaComponent} from "./components/clientes-lista/clientes-lista.component";
import {ClientesCadastroComponent} from "./components/clientes-cadastro/clientes-cadastro.component";
import {ClientesVisualizacaoComponent} from "./components/clientes-visualizacao/clientes-visualizacao.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'entregas', component: EntregasComponent, canActivate: [adminGuard] },
  { path: 'clientes', component: ClientesListaComponent, canActivate: [adminGuard] },
  { path: 'clientes-cadastro', component: ClientesCadastroComponent, canActivate: [adminGuard] },
  { path: 'clientes-visualizacao', component: ClientesVisualizacaoComponent, canActivate: [adminGuard] },
  
  { path: 'left-bar', component: LeftBarComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'map', component: MapComponent },
  { path: 'geo', component: GeoComponent },
  { path: 'test', component: TestingComponent }
];
