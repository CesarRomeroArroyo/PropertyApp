import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  difereciaEntreDosPuntos(lon1, lat1, lon2, lat2){
    var rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
     var dLat = rad( lat2 - lat1 );
     var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     var d = R * c;
    return d.toFixed(3); //Retorna tres decimales
  }

  fechaActual(){
    var hoy = new Date();
    var dd: string | number = hoy.getDate();
    var mm: string | number = hoy.getMonth()+1;
    var yyyy: string | number = hoy.getFullYear();
    var hora: string | number = hoy.getHours();
    var minuto: string | number = hoy.getMinutes();

    if(dd<10) {
      dd='0'+dd;
    }

    if(mm<10) {
      mm='0'+mm;
    }

    if(minuto<10) {
      minuto='0'+minuto;
    }
    var fecha = dd+'/'+mm+'/'+yyyy;
    return fecha;
  }

}
