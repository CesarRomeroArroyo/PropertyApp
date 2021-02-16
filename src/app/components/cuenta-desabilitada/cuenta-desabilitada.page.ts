import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-cuenta-desabilitada',
  templateUrl: './cuenta-desabilitada.page.html',
  styleUrls: ['./cuenta-desabilitada.page.scss'],
})
export class CuentaDesabilitadaPage implements OnInit {

  constructor(private navCtrl: Router, private utils: UtilsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.utils.sessionActive();
  }

  salir(): void {
    localStorage.removeItem('IDUSER');
    this.navCtrl.navigate(['/login']);
  }

}
