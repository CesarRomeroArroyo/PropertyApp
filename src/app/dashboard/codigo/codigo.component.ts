import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { messages } from 'src/app/constants/messages';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StateApp } from 'src/app/services/state.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-codigo',
    templateUrl: './codigo.component.html',
    styleUrls: ['./codigo.component.scss'],
})
export class CodigoComponent implements OnInit {

    frmCodigo: FormGroup;

    constructor(
        private frmbuilder: FormBuilder,
        private navCtrl: Router,
        private fbservice: FirebaseService,
        private utils: UtilsService,
        private stateServis: StateApp
    ) { }

    ngOnInit() {
        this.initializeFormCode();
    }

    initializeFormCode(): void {
        this.frmCodigo = this.frmbuilder.group({
            codigo: ['', [Validators.required]]
        });
    }

    setCodigo(): void {
        if (!this.frmCodigo.valid) {
            this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
        } else {
            this.fbservice.getData(tables.EDIFICIOS, this.frmCodigo.value.codigo).subscribe(data => {
                if (data != "") {
                    this.stateServis.setData(data);
                    this.navCtrl.navigate(['/dashboard/home']);
                } else
                    this.utils.showToast(messages.INPUST_ERROR.NODATA, 1000).then(toasData => toasData.present());
            });
        }
    }
}
