import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuentaDesabilitadaPage } from './cuenta-desabilitada.page';

describe('CuentaDesabilitadaPage', () => {
  let component: CuentaDesabilitadaPage;
  let fixture: ComponentFixture<CuentaDesabilitadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaDesabilitadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuentaDesabilitadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
