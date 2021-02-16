import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { inputs } from 'src/app/constants/inputs';
import { messages } from 'src/app/constants/messages';
import { roles } from 'src/app/constants/roles';
import { tables } from 'src/app/constants/tables';
import { apartamentosModel } from 'src/app/models/apartamentos.model';
import { apartamento, states } from '../../constants/states';
import { validateEqual } from '../../constants/validadorEqual';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.page.html',
  styleUrls: ['./registrar-usuarios.page.scss'],
})

export class RegistrarUsuariosPage implements OnInit {

  frmRegister: FormGroup;
  errorInpus = messages.REGISTER_INPUST_ERROR;
  codigoEdificio: string;
  apartamentos:apartamentosModel[] = [];

  constructor(
    private fbservice: FirebaseService,
    private utils: UtilsService,
    private navCtrl: Router,
    private loadCtrl: LoadingController,
    private frmbuilder: FormBuilder,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
    this.initializeFormRegister();
  }

  getData() {
    this.router.params.subscribe(data => {
      this.codigoEdificio = data.codigoEdificio;
    });

    this.fbservice.getData(tables.APARTAMENTS, this.codigoEdificio).subscribe(apartamentos => {
      apartamentos.forEach(info => {
        info.estado === apartamento.DESOCUPADO ? this.apartamentos.push(info) : null;
      });
    });
  }

  initializeFormRegister(): void {
    this.frmRegister = this.frmbuilder.group({
      email: ['', [Validators.required, Validators.pattern(inputs.EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      CC: ['', [Validators.required, Validators.minLength(6), Validators.pattern(inputs.NUMBER)]],
      tipoInquilino: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.minLength(10), Validators.pattern(inputs.NUMBER)]],
      passConfirmation: ['', [Validators.required]],
      apartamento: ['', [Validators.required]],
      tipo: [roles.USER, [Validators.required]],
      estado: [states.ACTIVE, [Validators.required]],
      fechaCreacion: [this.utils.fechaActual(), [Validators.required]],
      codigoEdificios: [[this.codigoEdificio], [Validators.required]]
    },
      {
        validators: validateEqual,
      });
  }

  async registerUser(): Promise<void> {
    if (!this.frmRegister.valid) {
      this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
    } else {
      let loader = this.loadCtrl.create({ message: messages.information.WAIT });
      (await loader).present();
      try {
        await this.fbservice.registerUser(this.frmRegister.value);
        this.utils.doAlert(`${messages.REGISTER.SUCCESS} ${this.frmRegister.value.email}`).then(data => data.present());
        this.frmRegister.reset();
        this.navCtrl.navigate(['/login']);
      } catch (error) {
        if (error.code === messages.REGISTER.CODE_ERROR_EMAIL)
          this.utils.showToast(messages.REGISTER.ERROR_EMAIL, 1000).then(toasData => toasData.present());
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
  get CC() {
    return this.frmRegister.get('CC');
  }
  get user() {
    return this.frmRegister.get('user');
  }
  get password() {
    return this.frmRegister.get('password');
  }
  get passConfirmation() {
    return this.frmRegister.get('password');
  }
  get tel() {
    return this.frmRegister.get('tel');
  }

  validateEqual(): boolean {
    return this.frmRegister.hasError('noSonIguales') &&
      this.frmRegister.get('password').dirty &&
      this.frmRegister.get('passConfirmation').dirty;
  }
}