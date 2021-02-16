import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CodigoPageRoutingModule } from './codigo-routing.module';
import { CodigoPage } from './codigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CodigoPage]
})
export class CodigoPageModule { }
