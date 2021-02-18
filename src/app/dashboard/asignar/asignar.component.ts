import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddAdminComponent } from '../modals/add-admin/add-admin.component';
import { ListEdifComponent } from '../modals/list-edif/list-edif.component';
import { userAdminModel } from 'src/app/models/usuariosAdmin.models';
import { edificiosModels } from 'src/app/models/edificios.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss'],
})

export class AsignarComponent implements OnInit, OnDestroy {

  userAdmin: userAdminModel;
  private subcription: Subscription = null;

  constructor(
    private fbservice: FirebaseService,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: Router
  ) { }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  ngOnInit() {
    this.loadUserAdmin();
  }

  loadUserAdmin(): void {
    this.subcription = this.fbservice.obtener(tables.USERS).subscribe(data => {
      this.userAdmin = data;
    });
  }

  async assignModal(idAdmin: string): Promise<any> {
    const modal = await this.modalController.create({
      component: ListEdifComponent,
      cssClass: 'modalCss',
      componentProps: {
        idAdmin: idAdmin
      }
    });
    await modal.present()
  }

  async removeBuilding(Edificio: edificiosModels, idAdmin: string): Promise<any> {
    const alert = await this.alertCtrl.create({
      header: '¿esta seguro?',
      buttons: [{
        text: 'no',
      }, {
        text: 'Si',
        handler: () => { this.fbservice.removeBuilding(Edificio, idAdmin) }
      }]
    });
    await alert.present();
  }

  async registerAdminModal(): Promise<any> {
    const modal = await this.modalController.create({
      component: AddAdminComponent,
      cssClass: 'modalCss',
    });
    await modal.present()
  }

  Finalize(): void {
    this.navCtrl.navigate(['/dashboard']);
  }
}
