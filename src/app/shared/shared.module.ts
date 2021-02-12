import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPage } from './menu/menu.page';
import { IonicModule } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../services/utils.service';




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
