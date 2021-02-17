import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditarUsuarioPageRoutingModule } from './editar-usuario-routing.module';
import { EditarUsuarioPage } from './editar-usuario.page';
import { AddApartUserComponent } from './modals/add-apart-user/add-apart-user.component';
import { HomeAddApartComponent } from './home-add-apart/home-add-apart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarUsuarioPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EditarUsuarioPage,
    AddApartUserComponent,
    HomeAddApartComponent
  ]
})
export class EditarUsuarioPageModule {}
