import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu/menu.page';
import { ModalInicioComponent } from './modal-inicio/modal-inicio.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [MenuPage, ModalInicioComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [MenuPage],
})

export class SharedModule { }
