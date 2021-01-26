import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaDesabilitadaPageRoutingModule } from './cuenta-desabilitada-routing.module';

import { CuentaDesabilitadaPage } from './cuenta-desabilitada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaDesabilitadaPageRoutingModule
  ],
  declarations: [CuentaDesabilitadaPage]
})
export class CuentaDesabilitadaPageModule {}
