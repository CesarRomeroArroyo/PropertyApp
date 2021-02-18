import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CodigoMudanzaPageRoutingModule } from './codigo-mudanza-routing.module';
import { CodigoMudanzaPage } from './codigo-mudanza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoMudanzaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CodigoMudanzaPage]
})
export class CodigoMudanzaPageModule {}
