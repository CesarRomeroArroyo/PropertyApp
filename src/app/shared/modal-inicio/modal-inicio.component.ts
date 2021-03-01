import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { roles } from 'src/app/constants/roles';
import { storage } from '../../constants/storage';
import { apartamentosModel } from '../../models/apartamentos.model';
import { edificiosModels } from '../../models/edificios.models';
import { messages } from '../../constants/messages';

@Component({
  selector: 'app-modal-inicio',
  templateUrl: './modal-inicio.component.html',
  styleUrls: ['./modal-inicio.component.scss'],
})
export class ModalInicioComponent implements OnInit {

  rol = roles;
  frmModal: FormGroup;
  edificios: edificiosModels;
  valid = false;
  apartamentos: apartamentosModel;
  edificioAdmin: edificiosModels;
  user: any;
  textBuscar :string= "";

  

  constructor(
    private frmbuilder: FormBuilder,
    private toasCtrl: ToastController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { 
    this.edificioAdmin = (JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING)));
    this.selectModalUsers();
    this.initializeFormModal(this.edificioAdmin);
  }

  initializeFormModal(edificioAdmin:edificiosModels): void {
    console.log(edificioAdmin)
    this.frmModal = this.frmbuilder.group({
      modal: ['' || [edificioAdmin], [Validators.required]]
    });
  }

  buildingOrApartamentsData(): void {

    if (this.frmModal.invalid)
    this.showToast(messages.modal.EMPTY_FIELDS, 1000).then(toasData => toasData.present());
    else {
      if (this.user.tipo == this.rol.ADMIN) {
          localStorage.setItem(storage.RESIDENTI_BUILDING, JSON.stringify(this.frmModal.value.modal));  
      
      }
      
      else {
        localStorage.setItem(storage.RESIDENTI_APARTAMENT, JSON.stringify(this.frmModal.value.modal));
      }
      localStorage.setItem(storage.RESIDENTI_MODAL, JSON.stringify(false));
      this.modalCtrl.dismiss();
      location.reload();
    }
  }

  selectModalUsers(): void {
    this.user = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER));
    if (this.user.tipo == roles.ADMIN)
      this.edificios = this.user.edificios;
    else this.apartamentos = this.user.apartamentos;
  }

  searchbuildingOrApartaments(event) {
    this.textBuscar = event.detail.value;
  }

  showToast(message: string, delay: number): Promise<any> {
    return this.toasCtrl.create({
      message: message,
      duration: delay
    });
  }

}
