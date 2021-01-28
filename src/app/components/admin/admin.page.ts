import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private navCtrl: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    const user = JSON.parse(localStorage.getItem('IDUSER'));

    if(user){
      if (user.estado==1) {
        if(user.tipo == "admin"){
        this.navCtrl.navigate(['/admin']);
        }else{
          this.navCtrl.navigate(['/home']);
        }
    }else{
      this.navCtrl.navigate(['/cuenta-desabilitada']);
    }

    }else{
      this.navCtrl.navigate(['/login']);
    }
    
  }


  sali(){
     localStorage.removeItem('IDUSER');
      this.navCtrl.navigate(['/login']);
  }

}
