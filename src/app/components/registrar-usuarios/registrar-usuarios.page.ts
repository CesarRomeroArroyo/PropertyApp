import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { inputs } from 'src/app/constants/inputs';
import { messages } from 'src/app/constants/messages';
import { roles } from 'src/app/constants/roles';
import { states } from '../../constants/states';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.page.html',
  styleUrls: ['./registrar-usuarios.page.scss'],
})

export class RegistrarUsuariosPage implements OnInit {

  frmRegister: FormGroup;
  constructor(
    private fbservice: FirebaseService,
    private utils: UtilsService,
    private navCtrl: Router,
    private loadCtrl: LoadingController,
    private frmbuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeFormRegister();
  }

  initializeFormRegister() {
    this.frmRegister = this.frmbuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(inputs.EMAIL)]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      user: ['', [Validators.required]],
      tel: ['', [Validators.required]],
    });
  }

  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('IDUSER'));
    if (user && user != null) {
      if (user.estado == states.ACTIVE) {
        if (user.tipo == roles.ADMIN) {
          this.navCtrl.navigate(['/admin']);
        } else {
          this.navCtrl.navigate(['/home']);
        }
      } else {
        this.navCtrl.navigate(['/cuenta-desabilitada']);
      }
    }
  }

  async registerUser() {
    if (!this.frmRegister.valid) {

    } else {
      let loader = this.loadCtrl.create({
        message: "Por favor espere..."
      });
      (await loader).present();

      this.frmRegister.value.tipo = roles.USER;
      this.frmRegister.value.estado = states.ACTIVE;
      this.frmRegister.value.fechaCreacion = this.utils.fechaActual();

      let data = await this.fbservice.guardarDatos("usuarios", this.frmRegister.value);

      if (data !== null) {
        this.fbservice.registerUser(this.frmRegister.value);
        this.utils.doAlert(`${messages.login.SUCCESS} ${this.frmRegister.value.email}`).then(data => data.present());
        this.frmRegister.reset();
        this.navCtrl.navigate(['/login']);
      } else {
        console.log("Error");
      }

      (await loader).dismiss();
    }
  }
}