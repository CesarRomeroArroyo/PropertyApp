import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  constructor(private navCtrl: Router ) { }

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

    }
    
  }

}
