import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { roles } from 'src/app/constants/roles';
import { storage } from 'src/app/constants/storage';
import { Usermodel } from '../../models/usuarios.model';
import { apartamento } from '../../constants/states';
import { edificiosModels } from '../../models/edificios.models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  rol = roles;
  frmModal: FormGroup;
  edificios: edificiosModels;
  edificioAdmin: edificiosModels;
  valid = false;

  apartamento: any;
  user: any;
  constructor(
    private frmbuilder: FormBuilder,
    private modalctrl: ModalController,

  ) { }

  ngOnInit() {
    this.initializeFormModal();
    this.selectModalUsers();
    this.edificioAdmin = (JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING)));
  }

  initializeFormModal():void {
    this.frmModal = this.frmbuilder.group({
      modal: ['', [Validators.required]]
    });
  }

  buildingOrApartamentsData():void {
    if (!this.frmModal.valid)   this.valid = true;
     else {
      if (this.user.tipo == this.rol.ADMIN)
        localStorage.setItem(storage.RESIDENTI_BUILDING, JSON.stringify(this.frmModal.value.modal.codigoEdificio));
      else {
        localStorage.setItem(storage.RESIDENTI_APARTAMENT, JSON.stringify(this.frmModal.value.modal));
      }
      localStorage.setItem(storage.RESIDENTI_MODAL, JSON.stringify(false));
      this.modalctrl.dismiss();
      location.reload();
    }
  }

  selectModalUsers():void {
    this.user = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER));
    if (this.user.tipo == roles.ADMIN) this.edificios = this.user.edificios;
    else this.apartamento = this.user.apartamentos;
  }

}
