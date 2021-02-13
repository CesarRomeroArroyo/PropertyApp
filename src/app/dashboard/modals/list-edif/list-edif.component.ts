import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { messages } from 'src/app/constants/messages';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-list-edif',
    templateUrl: './list-edif.component.html',
    styleUrls: ['./list-edif.component.scss'],
})
export class ListEdifComponent implements OnInit {

    frmEdificios: FormGroup;
    @Input() idAdmin: any;
    edificios = [];

    constructor(
        private frmbuild: FormBuilder,
        private modalController: ModalController,
        private fbservice: FirebaseService,
        private utils: UtilsService
    ) { }

    ngOnInit() {
        this.initializateFrmEdificios();
    }

    initializateFrmEdificios(): void {
        this.frmEdificios = this.frmbuild.group({
            edificios: ['', [Validators.required]],
        });

        this.fbservice.obtener(tables.EDIFICIOS).subscribe(data => {
            this.edificios = data;
        });
    }

    closeModal() {
        this.modalController.dismiss();
    }

    asignarEdif() {
        if (!this.frmEdificios.valid)
            this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
        else {
            this.fbservice.assignBuilding(this.frmEdificios.value.edificios, this.idAdmin);
            this.modalController.dismiss();
        }
    }
}
