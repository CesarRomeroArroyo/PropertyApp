import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApartamentoComponent } from './apartamento/apartamento.component';
import { AsignarComponent } from './asignar/asignar.component';
import { CodigoComponent } from './codigo/codigo.component';
import { dashRouting } from './dash.routing';
import { EdificioComponent } from './edificio/edificio.component';
import { HomeComponent } from './home/home.component';
import { ModalsModule } from './modals/modals.module';
import { ZonasComunesComponent } from './zonas-comunes/zonas-comunes.component';

@NgModule({
  declarations: [
    ApartamentoComponent,
    EdificioComponent,
    HomeComponent,
    ZonasComunesComponent,
    CodigoComponent,
    AsignarComponent,    
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(dashRouting),
    ReactiveFormsModule,
    ModalsModule
  ],
 

})
export class DashboardModule { }
