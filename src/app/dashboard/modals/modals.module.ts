import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddApartComponent } from './add-apart/add-apart.component';
import { AddZonasComponent } from './add-zonas/add-zonas.component';
import { EditApartComponent } from './edit-apart/edit-apart.component';
import { EditZonasComponent } from './edit-zonas/edit-zonas.component';
import { ListEdifComponent } from './list-edif/list-edif.component';

@NgModule({
  declarations: [
    AddApartComponent,
    EditApartComponent,
    AddZonasComponent,
    EditZonasComponent,
    ListEdifComponent,
    AddAdminComponent

  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AddApartComponent,
    EditApartComponent,
    AddZonasComponent,
    EditZonasComponent,
    ListEdifComponent,
    AddAdminComponent
  ]
})
export class ModalsModule { }
