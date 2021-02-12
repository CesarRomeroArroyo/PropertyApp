import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoMudanzaPage } from './codigo-mudanza.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoMudanzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoMudanzaPageRoutingModule {}
