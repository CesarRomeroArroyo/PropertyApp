import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodigoPage } from './codigo.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoPageRoutingModule { }
