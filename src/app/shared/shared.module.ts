import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPage } from './menu/menu.page';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { ModalPage } from './modal/modal.page';




@NgModule({

  declarations: [MenuPage, ModalPage],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
    providers:[UtilsService],
  exports:[MenuPage,ModalPage]
})
export class SharedModule { }
