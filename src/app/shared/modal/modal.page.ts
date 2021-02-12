import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { storage } from 'src/app/constants/storage';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  frmModal: FormGroup;
  edificios: any;
  edificioAdmin: any= [];
  valid=false;
  constructor(
 
    private frmbuilder: FormBuilder,
    private modalctrl: ModalController,
  
  ) { }

  ngOnInit() {
    this.initializeFormModal();
    const user = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER));
    this.edificios = user.edificios;

      this.edificioAdmin =(JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING)));
  
  }

  initializeFormModal() {
    this.frmModal = this.frmbuilder.group({
      modal: ['', [Validators.required]]
    });
  }

  buildingAvalible() {

    if (!this.frmModal.valid) {
     // this.utils.showToast(messages.modal.EMPTY_FIELDS, 3000).then(toasData => toasData.present());
         this.valid=true
    } else {
     localStorage.setItem("EDIFICIO", JSON.stringify(this.frmModal.value.modal));

      localStorage.setItem("MODAL", JSON.stringify(false));
      this.modalctrl.dismiss();

      location.reload();
     
    }

  }


}
