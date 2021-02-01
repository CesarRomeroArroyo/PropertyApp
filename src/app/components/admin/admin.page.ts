import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private navCtrl: Router, private util: UtilsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.util.sessionActive();
  }

  logout() {
    localStorage.removeItem("IDUSER");
    this.navCtrl.navigate(['/login']);
  }

}
