import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MudanzaPage } from './mudanza.page';

const routes: Routes = [
  {
    path: ':id',
    component: MudanzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MudanzaPageRoutingModule {}
