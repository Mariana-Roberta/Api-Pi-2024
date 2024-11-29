import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesVisualizacaoComponent } from './clientes-visualizacao.component';

describe('ClientesVisualizacaoComponent', () => {
  let component: ClientesVisualizacaoComponent;
  let fixture: ComponentFixture<ClientesVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesVisualizacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
