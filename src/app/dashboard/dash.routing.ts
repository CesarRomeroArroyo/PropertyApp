import { Routes } from "@angular/router";
import { ApartamentoComponent } from "./apartamento/apartamento.component";
import { AsignarComponent } from "./asignar/asignar.component";
import { CodigoComponent } from "./codigo/codigo.component";
import { EdificioComponent } from "./edificio/edificio.component";
import { HomeComponent } from "./home/home.component";
import { ZonasComunesComponent } from "./zonas-comunes/zonas-comunes.component";


export const dashRouting:Routes =[
    {path: 'apartamento',component:ApartamentoComponent, data:{title:"apartamento"}},
    {path: '',component:EdificioComponent, data:{title:"edificio"}},
    {path: 'home',component:HomeComponent, data:{title:"home"}},
    {path: 'zonasComunes',component:ZonasComunesComponent, data:{title:"zonas comunes"}},
    {path: 'codigo',component:CodigoComponent, data:{title:"codigo"}},
    {path: 'asignar', component:AsignarComponent, data:{title:"asignar"}}
 
];