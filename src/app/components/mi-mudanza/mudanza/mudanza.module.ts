import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MudanzaPageRoutingModule } from './mudanza-routing.module';

import { MudanzaPage } from './mudanza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MudanzaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MudanzaPage]
})
export class MudanzaPageModule {}
