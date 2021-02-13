import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { messages } from 'src/app/constants/messages';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-edit-apart',
    templateUrl: './edit-apart.component.html',
    styleUrls: ['./edit-apart.component.scss'],
})
export class EditApartComponent implements OnInit {

    @Input() data: any;
    frmApartamento: FormGroup;

    constructor(
        private modalController: ModalController,
        private frmbuild: FormBuilder,
        private fbservice: FirebaseService,
        private utils: UtilsService
    ) { }

    ngOnInit() {
        this.initializateFrmApart();
    }

    closeModal(): void {
        this.modalController.dismiss();
    }

    initializateFrmApart(): void {
        this.frmApartamento = this.frmbuild.group({
            name: ['' || this.data.name, [Validators.required]],
        });
    }

    editApart(): void {
        if (!this.frmApartamento.valid)
            this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
        else {
            this.fbservice.actualizarDatos(tables.APARTAMENTS, this.frmApartamento.value, this.data.id);
            this.modalController.dismiss();
        }
    }
}
