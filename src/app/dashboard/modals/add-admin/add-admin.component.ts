import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { inputs } from 'src/app/constants/inputs';
import { messages } from 'src/app/constants/messages';
import { roles } from 'src/app/constants/roles';
import { states } from 'src/app/constants/states';
import { validateEqual } from 'src/app/constants/validadorEqual';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {

  frmRegister: FormGroup;
  errorInpus = messages.REGISTER_INPUST_ERROR;

  constructor(
    private frmbuilder: FormBuilder,
    private utils: UtilsService,
    private modalController: ModalController,
    private fbservices: FirebaseService
  ) { }

  ngOnInit() {
    this.initializeFormRegister();
  }

  registerAdmin(): void {
    if (!this.frmRegister.valid) {
      this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
    } else {
      this.fbservices.registrerAdmin(this.frmRegister.value).catch(error => {
        if (error.code === messages.REGISTER.CODE_ERROR_EMAIL)
          this.utils.showToast(messages.REGISTER.ERROR_EMAIL, 1000).then(toasData => toasData.present());
      });;
      this.closeModal()
    }
  }

  initializeFormRegister(): void {
    this.frmRegister = this.frmbuilder.group({
      email: ['', [Validators.required, Validators.pattern(inputs.EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passConfirmation: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      tipo: [roles.ADMIN, [Validators.required]],
      estado: [states.ACTIVE, [Validators.required]],
      fechaCreacion: [this.utils.fechaActual(), [Validators.required]],
    },
      {
        validators: validateEqual,
      }
    );
  }

  get email() {
    return this.frmRegister.get("email");
  }
  get name() {
    return this.frmRegister.get("name");
  }
  get password() {
    return this.frmRegister.get('password');
  }

  validateEqual(): boolean {
    return this.frmRegister.hasError('noSonIguales') &&
      this.frmRegister.get('password').dirty &&
      this.frmRegister.get('passConfirmation').dirty;
  }

  closeModal(): void {
    this.modalController.dismiss();
  }
}
