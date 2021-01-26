import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Usermodel } from '../../models/usuarios.model';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.page.html',
  styleUrls: ['./registrar-usuarios.page.scss'],
})
export class RegistrarUsuariosPage implements OnInit {

  user= {} as Usermodel;
  
  constructor(
    private fbservice : FirebaseService,
    private  utils :UtilsService,
    private navCtrl: Router,
    private toasCtrl: ToastController,
    private loadCtrl:LoadingController
   
  ) { }

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


     async registrarUsuario(){

      if (this.formValidacion()) {
        let loader = this.loadCtrl.create({
    
            message:"Por favor espere..."
          });
          (await loader).present();
          this.user.tipo="residente";
                this.user.estado=1;
                this.user.fechaCreacion= this.utils.fechaActual();
              
              let h = this.fbservice.guardarDatos("usuarios",this.user);
              
              if (h) {
                this.navCtrl.navigate(['/login']);
                this.showToast("Usuario registrado correctamente");
              } else {
                console.log("error");
              }

          (await loader).dismiss();
       }    
    }

formValidacion(){

    if (!this.user.nombre) {
      this.showToast("Ingrese su nombre");
      return false;
    }
    if (!this.user.email) {
      this.showToast("Ingrese su correo electrónico");
      return false;
    }

    if (!this.user.usuario) {
      this.showToast("Ingrese un usuario");
      return false;
    }

    if (!this.user.password) {
      this.showToast("Ingrese su contraseña");
      return false;
    }
    if (!this.user.telefono) {
      this.showToast("Ingrese su teléfono");
      return false;
    }

    return true;
}

showToast(mesaje:string){
  this.toasCtrl.create({
    message:mesaje,
    duration:3000
  })
  .then(toasData => toasData.present())
}




}
