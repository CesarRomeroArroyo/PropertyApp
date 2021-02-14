import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { messages } from 'src/app/constants/messages';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UniqueService } from 'src/app/services/unique.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-edificio',
    templateUrl: './edificio.component.html',
    styleUrls: ['./edificio.component.scss'],
})
export class EdificioComponent implements OnInit {

    frmEdificio: FormGroup;

    constructor(
        private frmbuild: FormBuilder,
        private navCtrl: Router,
        private fbservice: FirebaseService,
        private uniservice: UniqueService,
        private utils: UtilsService
    ) { }

    ngOnInit() {
        this.initializateFrmEdif();
    }

    initializateFrmEdif(): void {
        this.frmEdificio = this.frmbuild.group({
            name: ['', [Validators.required]],
            direction: ['', [Validators.required]],
            codigoEdificio: [this.uniservice.codigo(), [Validators.required]]
        });
    }

    registerEdificio(): void {
        if (!this.frmEdificio.valid) {
            this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
        } else {
            this.fbservice.guardarDatos(tables.EDIFICIOS, this.frmEdificio.value);
            this.utils.showToast(messages.PROCESOS.SUCCESSFUL, 1000).then(toasData => toasData.present());
            this.frmEdificio.reset();
        }
    }

    administerEdif(): void {
        this.navCtrl.navigate(['/dashboard/codigo']);
    }

    asignar(): void {
        this.navCtrl.navigate(['/dashboard/asignar']);
    }
}
