import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddZonasComponent } from '../modals/add-zonas/add-zonas.component';
import { EditZonasComponent } from '../modals/edit-zonas/edit-zonas.component';

@Component({
    selector: 'app-zonas-comunes',
    templateUrl: './zonas-comunes.component.html',
    styleUrls: ['./zonas-comunes.component.scss'],
})
export class ZonasComunesComponent implements OnInit {

    zonasComunes: any;
    @Input() edificio: any;
    
    constructor(
        private modalController: ModalController,
        private fbservice: FirebaseService,
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
        this.loadZona();
    }

    loadZona() {
        this.fbservice.getData(tables.ZONASCOMUNES, this.edificio[0].codigoEdificio).subscribe(data => {
            this.zonasComunes = data;
        });
    }

    async updateZonaModal(data: any) {
        const modal = await this.modalController.create({
            component: EditZonasComponent,
            componentProps: {
                data: data
            }
        });
        await modal.present()
    }

    async addModalZonas() {
        const modal = await this.modalController.create({
            component: AddZonasComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                edificio: this.edificio
            }
        });
        return await modal.present()
    }

    async deleteZona(data: any) {
        const alert = await this.alertCtrl.create({
            header: '¿esta seguro?',
            buttons: [
                {
                    text: 'no',
                    role: 'cancel',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Si',
                    handler: () => {
                        this.fbservice.eliminarDatos(tables.ZONASCOMUNES, data.id);
                    }
                }
            ]
        });
        await alert.present();
    }
}
