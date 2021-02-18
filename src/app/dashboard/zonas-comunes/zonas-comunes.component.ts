import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { tables } from 'src/app/constants/tables';
import { edificiosModels } from 'src/app/models/edificios.models';
import { zonasComunesModel } from 'src/app/models/zonasComunes.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddZonasComponent } from '../modals/add-zonas/add-zonas.component';
import { EditZonasComponent } from '../modals/edit-zonas/edit-zonas.component';

@Component({
  selector: 'app-zonas-comunes',
  templateUrl: './zonas-comunes.component.html',
  styleUrls: ['./zonas-comunes.component.scss'],
})

export class ZonasComunesComponent implements OnInit, OnDestroy {

  zonasComunes: zonasComunesModel[] = [];
  subZonasCumunes: Subscription = null;
  @Input() edificio: edificiosModels;

  constructor(
    private modalController: ModalController,
    private fbservice: FirebaseService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadZona();
  }

  ngOnDestroy() {
    this.subZonasCumunes.unsubscribe();
  }

  loadZona() {
    this.subZonasCumunes = this.fbservice.getData(tables.ZONASCOMUNES, this.edificio[0].codigoEdificio).subscribe(zonasComunes => {
      this.zonasComunes = zonasComunes;
    });
  }

  async updateZonaModal(zonaComun: zonasComunesModel) {
    const modal = await this.modalController.create({
      component: EditZonasComponent,
      componentProps: { zonaComun: zonaComun }
    });
    await modal.present()
  }

  async addModalZonas() {
    const modal = await this.modalController.create({
      component: AddZonasComponent,
      cssClass: 'my-custom-class',
      componentProps: { edificio: this.edificio }
    });
    return await modal.present()
  }

  async deleteZona(zonaComun: zonasComunesModel) {
    const alert = await this.alertCtrl.create({
      header: '¿esta seguro?',
      buttons: [{
        text: 'no',
      },
      {
        text: 'Si',
        handler: () => { this.fbservice.eliminarDatos(tables.ZONASCOMUNES, zonaComun.id); }
      }]
    });
    await alert.present();
  }
}