import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { tables } from 'src/app/constants/tables';
import { apartamentosModel } from 'src/app/models/apartamentos.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddApartUserComponent } from '../modals/add-apart-user/add-apart-user.component';

@Component({
  selector: 'app-home-add-apart',
  templateUrl: './home-add-apart.component.html',
  styleUrls: ['./home-add-apart.component.scss'],
})

export class HomeAddApartComponent implements OnInit, OnDestroy {

  apartamentosUser: apartamentosModel;
  @Input() idUser: string;
  private subHome: Subscription = null;

  constructor(
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private fb: FirebaseService
  ) { }

  ngOnInit() {
    this.getDataUser();
  }

  ngOnDestroy() {
    this.subHome.unsubscribe();
  }

  getDataUser(): void {
    this.subHome = this.fb.getId(tables.USERS, this.idUser).subscribe(user => {
      this.apartamentosUser = user.apartamentos;
    });
  }

  async addApartamentUser() {
    const modal = await this.modalController.create({
      component: AddApartUserComponent,
      componentProps: { idUser: this.idUser }
    });
    await modal.present()
  }

  async deleteApartmentUser(apart: apartamentosModel) {
    const alert = await this.alertCtrl.create({
      header: '¿esta seguro?',
      buttons: [{
        text: 'no',
      }, {
        text: 'Si',
        handler: () => { this.fb.removeApartment(apart, this.idUser); }
      }]
    });
    await alert.present();
  }
}
