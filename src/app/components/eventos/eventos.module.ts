import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosPageRoutingModule } from './eventos-routing.module';

import { EventosPage } from './eventos.page';
import { CalendarModule } from 'ion2-calendar';
import { AddEventosComponent } from './add-eventos/add-eventos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosPageRoutingModule,
    CalendarModule,
    ReactiveFormsModule,
    
  ],
  declarations: [EventosPage,AddEventosComponent]
})
export class EventosPageModule {}
