import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarUsuariosPage } from './registrar-usuarios.page';

const routes: Routes = [
  {
    path: ':codigoEdificio',
    component: RegistrarUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarUsuariosPageRoutingModule {}
