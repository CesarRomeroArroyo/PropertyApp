import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPage } from './menu/menu.page';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MenuPage],
  imports: [
    CommonModule,
    IonicModule

  ],
  exports:[MenuPage]
})
export class SharedModule { }
