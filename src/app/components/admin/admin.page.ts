import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { UtilsService } from '../../services/utils.service';
import { ModalPage } from '../../shared/modal/modal.page';
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

  }

  ionViewWillEnter() {
   
    this.util.sessionActive();
  }

  logout() {
    this.menu.close("main-menu");
    localStorage.removeItem("IDUSER");
    this.navCtrl.navigate(['/login']);
  }

  openMenu() {
    this.menu.enable(true, 'main-menu');
    this.menu.open("main-menu");
  }

  
}
