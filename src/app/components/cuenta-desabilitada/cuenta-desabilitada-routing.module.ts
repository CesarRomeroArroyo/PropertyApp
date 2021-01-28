import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaDesabilitadaPage } from './cuenta-desabilitada.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaDesabilitadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaDesabilitadaPageRoutingModule {}
