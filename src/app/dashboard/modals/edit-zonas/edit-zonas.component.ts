import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { messages } from 'src/app/constants/messages';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-edit-zonas',
    templateUrl: './edit-zonas.component.html',
    styleUrls: ['./edit-zonas.component.scss'],
})
export class EditZonasComponent implements OnInit {

    frmZona: FormGroup;
    @Input() data: any;

    constructor(
        private frmbuild: FormBuilder,
        private modalController: ModalController,
        private fbservice: FirebaseService,
        private utils: UtilsService
    ) { }

    ngOnInit() {
        this.initializateFrmZona();
    }

    closeModal(): void {
        this.modalController.dismiss();
    }

    initializateFrmZona(): void {
        this.frmZona = this.frmbuild.group({
            name: [this.data.name, [Validators.required]],
            cost: [this.data.cost, [Validators.required]],
            description: [this.data.description, [Validators.required]]
        });
    }

    async editZona() {
        if (!this.frmZona.valid) {
            this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
        } else {

            await this.fbservice.actualizarDatos("zonasComunes", this.frmZona.value, this.data.id);
            this.modalController.dismiss();
        }

    }

}

