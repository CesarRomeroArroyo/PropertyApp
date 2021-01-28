import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roles } from 'src/app/constants/roles';
import { states } from '../../constants/states';

@Component({
  selector: 'app-cuenta-desabilitada',
  templateUrl: './cuenta-desabilitada.page.html',
  styleUrls: ['./cuenta-desabilitada.page.scss'],
})
export class CuentaDesabilitadaPage implements OnInit {

  constructor(private navCtrl: Router ) { }

  ngOnInit() {
  }

 
  
  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('IDUSER'));

    if ( user != null) {
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
  salir(){

    localStorage.removeItem('IDUSER');
     this.navCtrl.navigate(['/login']);
 }


}
