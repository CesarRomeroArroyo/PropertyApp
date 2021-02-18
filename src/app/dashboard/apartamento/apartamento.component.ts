import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { tables } from 'src/app/constants/tables';
import { apartamentosModel } from 'src/app/models/apartamentos.model';
import { edificiosModels } from 'src/app/models/edificios.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddApartComponent } from '../modals/add-apart/add-apart.component';
import { EditApartComponent } from '../modals/edit-apart/edit-apart.component';

@Component({
  selector: 'app-apartamento',
  templateUrl: './apartamento.component.html',
  styleUrls: ['./apartamento.component.scss'],
})

export class ApartamentoComponent implements OnInit, OnDestroy {

  apartamentos: apartamentosModel[] = [];
  private subApart: Subscription = null;
  @Input() edificio: edificiosModels;

  constructor(
    private modalController: ModalController,
    private fbservice: FirebaseService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.loadApart();
  }

  ngOnDestroy() {
    this.subApart.unsubscribe();
  }

  loadApart(): void {
    this.subApart = this.fbservice.getData(tables.APARTAMENTS, this.edificio[0].codigoEdificio).subscribe(apartamentos => {
      this.apartamentos = apartamentos;
    });
  }

  async addApartModal(): Promise<any> {
    const modal = await this.modalController.create({
      component: AddApartComponent,
      cssClass: 'modalCss',
      componentProps: {
        edificio: this.edificio
      }
    });
    await modal.present()
  }

  async updateApartModal(apartamento: apartamentosModel): Promise<any> {
    const modal = await this.modalController.create({
      component: EditApartComponent,
      componentProps: { apartamento: apartamento }
    });
    await modal.present()
  }

  async deleteApart(apartamento: apartamentosModel): Promise<any> {
    const alert = await this.alertCtrl.create({
      header: '¿esta seguro?',
      buttons: [{
        text: 'no',
      }, {
        text: 'Si',
        handler: () => { this.fbservice.eliminarDatos(tables.APARTAMENTS, apartamento.id); }
      }
      ]
    });
    await alert.present();
  }
}