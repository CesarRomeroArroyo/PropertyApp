import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { roles } from '../constants/roles';
import { states } from '../constants/states';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private toasCtrl: ToastController,
        private alerCtrl: AlertController,
        private navCtrl: Router,
      
    ) { }

    difereciaEntreDosPuntos(lon1, lat1, lon2, lat2) {
        var rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137; //Radio de la tierra en km
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d.toFixed(3); //Retorna tres decimales
    }

    fechaActual() {
        var hoy = new Date();
        var dd: string | number = hoy.getDate();
        var mm: string | number = hoy.getMonth() + 1;
        var yyyy: string | number = hoy.getFullYear();
        var hora: string | number = hoy.getHours();
        var minuto: string | number = hoy.getMinutes();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        if (minuto < 10) {
            minuto = '0' + minuto;
        }
        var fecha = dd + '/' + mm + '/' + yyyy;
        return fecha;
    }

    showToast(message: string, delay: number): Promise<any> {
        return this.toasCtrl.create({
            message: message,
            duration: delay
        });
    }

    doAlert(message: string): Promise<any> {
        return this.alerCtrl.create({
            message: message,
            buttons: ['Ok']
        });
    }

    validedSession(frmAuth: FormGroup) {
        const user = JSON.parse(localStorage.getItem('IDUSER'));
        const rememberUser = JSON.parse(localStorage.getItem('REMEMBER_USER'));

        if (user && user != null) {
            if (user.estado === states.ACTIVE)
                if (user.tipo === roles.ADMIN)
                    this.navCtrl.navigate(['/admin']);
                else
                    this.navCtrl.navigate(['/home']);
            else
                this.navCtrl.navigate(['/cuenta-desabilitada']);

        } else {
            if (rememberUser && rememberUser != null) {
                frmAuth.patchValue({
                    user: rememberUser.user,
                    password: rememberUser.password,
                    check: true
                });
            }
        }
    }

   
    sessionActive() {
        const user = JSON.parse(localStorage.getItem('IDUSER'));

        if ( user ) {
            if (user.estado == states.ACTIVE) {
                if (user.tipo == roles.ADMIN)
                    this.navCtrl.navigate(['/admin']);
                else
                    this.navCtrl.navigate(['/home']);
            } else {
                this.navCtrl.navigate(['/cuenta-desabilitada']);
            }
        } else {
            this.navCtrl.navigate(['/login']);
        }
    }
}
