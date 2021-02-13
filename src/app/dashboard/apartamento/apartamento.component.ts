import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddApartComponent } from '../modals/add-apart/add-apart.component';
import { EditApartComponent } from '../modals/edit-apart/edit-apart.component';

@Component({
    selector: 'app-apartamento',
    templateUrl: './apartamento.component.html',
    styleUrls: ['./apartamento.component.scss'],
})

export class ApartamentoComponent implements OnInit {

    apartamento: any;
    @Input() edificio = [];

    constructor(
        private modalController: ModalController,
        private fbservice: FirebaseService,
        private alertCtrl: AlertController,
    ) { }

    ngOnInit() {
        this.loadApart();
    }

    loadApart(): void {
        this.fbservice.getData(tables.APARTAMENTS, this.edificio[0].codigoEdificio).subscribe(data => {
            this.apartamento = data;
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

    async updateApartModal(data: any): Promise<any> {
        const modal = await this.modalController.create({
            component: EditApartComponent,
            componentProps: {
                data: data
            }
        });
        await modal.present()
    }

    async deleteApart(data: any): Promise<any> {
        const alert = await this.alertCtrl.create({
            header: '¿esta seguro?',
            buttons: [
                {
                    text: 'no',
                    role: 'cancel',
                    handler: () => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Si',
                    handler: () => {
                        this.fbservice.eliminarDatos(tables.APARTAMENTS, data.id);
                    }
                }
            ]
        });
        await alert.present();
    }
}

