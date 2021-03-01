import { ModalInicioComponent } from '../shared/modal-inicio/modal-inicio.component';
import { ModalController } from '@ionic/angular';

export class ModalGlobal {
  constructor(private modalCtrl: ModalController){

  }
  async  openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalInicioComponent,
    });
    await modal.present();
  }
}
