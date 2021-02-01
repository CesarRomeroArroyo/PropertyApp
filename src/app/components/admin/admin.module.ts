import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from '../../shared/menu/menu.page';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';


@NgModule({
  declarations: [AdminPage,MenuPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
  ],

})
export class AdminPageModule {}
