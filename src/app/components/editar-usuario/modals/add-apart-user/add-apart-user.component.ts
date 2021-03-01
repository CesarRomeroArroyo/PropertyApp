import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { storage } from 'src/app/constants/storage';
import { tables } from 'src/app/constants/tables';
import { apartamentosModel } from 'src/app/models/apartamentos.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { apartamento } from 'src/app/constants/states';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { messages } from 'src/app/constants/messages';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-apart-user',
  templateUrl: './add-apart-user.component.html',
  styleUrls: ['./add-apart-user.component.scss'],
})

export class AddApartUserComponent implements OnInit, OnDestroy {

  @Input() idUser: string;
  codigoEdificio: string;
  apartamentos: apartamentosModel[] = [];
  frmApartment: FormGroup;
  private subAddApar: Subscription = null;

  constructor(
    private fbServices: FirebaseService,
    private frmbuild: FormBuilder,
    private modalController: ModalController,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.loaldApartmentAvaliable();
    this.initializatefrmApartment();
  }

  ngOnDestroy() {
    this.subAddApar.unsubscribe();
  }

  closeModal(): void {
    this.modalController.dismiss();
  }

  initializatefrmApartment(): void {
    this.frmApartment = this.frmbuild.group({
      apartamento: ['', Validators.required],
    });
  }

  loaldApartmentAvaliable(): void {
    this.codigoEdificio = JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING));
    this.subAddApar = this.fbServices.getData(tables.APARTAMENTS, this.codigoEdificio).subscribe(apartamentos => {
      this.apartamentos = apartamentos;
    });
  }

  addApartamentUser() {
    if (this.frmApartment.invalid) {
      this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
    } else {
      this.fbServices.assignApartment(this.frmApartment.value.apartamento, this.idUser);
      this.modalController.dismiss();
    }
  }
}
