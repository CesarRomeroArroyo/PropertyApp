import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { states } from '../../constants/states';
import { roles } from '../../constants/roles';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private navCtrl: Router, ) { }

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

  logout() {
    localStorage.removeItem("IDUSER");
    this.navCtrl.navigate(['/login']);
  }

}
