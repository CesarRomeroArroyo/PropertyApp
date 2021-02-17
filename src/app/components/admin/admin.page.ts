import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { UtilsService } from '../../services/utils.service';
import { storage } from '../../constants/storage';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private navCtrl: Router,
    private util: UtilsService,
    private menu: MenuController,
    ) { }

  ngOnInit() {

this.menu.enable(true);
  }

  ionViewWillEnter() {
   this.util.sessionActive();
  }

  logout():void {
    this.menu.close("main-menu");
    localStorage.removeItem(storage.RESIDENTI_USER);
    this.navCtrl.navigate(['/login']);
  }

 
}
