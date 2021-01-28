import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { inputs } from 'src/app/constants/inputs';
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

    if (user != null) {
      if (user.estado == 1) {
        if (user.tipo == "admin") {
          this.navCtrl.navigate(['/admin']);
        } else {
          this.navCtrl.navigate(['/home']);
        }
      } else {
        this.navCtrl.navigate(['/cuenta-desabilitada']);
      }
    }
  }

  async registrarUsuario() {

    if (!this.frmRegister.valid) {

    } else {

      let loader = this.loadCtrl.create({
        message: "Por favor espere..."
      });
      (await loader).present();
      this.frmRegister.value.tipo = "residente";
      this.frmRegister.value.estado = states.ACTIVE;
      this.frmRegister.value.fechaCreacion = this.utils.fechaActual();
      let data = await this.fbservice.guardarDatos("usuarios", this.frmRegister.value);
      if (data != null) {
        this.fbservice.registerUser(this.frmRegister.value);
        this.utils.doAlert("Usuario registrado correctamente, por favor verifique el mensaje de confirmacion enviado el correo " +
          this.frmRegister.value.email).then(data => data.present());
        this.navCtrl.navigate(['/login']);
      } else {
        console.log("Error");
      }

      (await loader).dismiss();
    }

  }

  get name() {
    return this.frmRegister.get("name");
  }
  get email() {
    return this.frmRegister.get("email");
  }
  get id() {
    return this.frmRegister.get('id');
  }
  get user() {
    return this.frmRegister.get('user');
  }
  get password() {
    return this.frmRegister.get('password');
  }
  get tel() {
    return this.frmRegister.get('tel');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Nombre requerido' }
    ],
    email: [
      { type: 'required', message: 'Correo requerido' },
      { type: 'pattern', message: 'Correo invalido' }
    ],
    id: [
      { type: 'required', message: 'Telefono requerido' }
    ],
    user: [
      { type: 'required', message: 'Usuario requerido' }
    ],
    password: [
      { type: 'required', message: 'Nombre requerido' }
    ],
    tel: [
      { type: 'required', message: 'Telefono requerido' }
    ]
  };
}