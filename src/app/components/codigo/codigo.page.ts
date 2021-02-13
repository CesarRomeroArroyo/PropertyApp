import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { messages } from 'src/app/constants/messages';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-codigo',
    templateUrl: './codigo.page.html',
    styleUrls: ['./codigo.page.scss'],
})

export class CodigoPage implements OnInit {

    frmCodigo: FormGroup;

    constructor(
        private frmbuilder: FormBuilder,
        private navCtrl: Router,
        private fb: FirebaseService,
        private utils: UtilsService,
    ) { }

    ngOnInit() {
        this.initializeFormCodigo();
    }

    initializeFormCodigo(): void {
        this.frmCodigo = this.frmbuilder.group({
            codigo: ['', [Validators.required]]
        });
    }

    setCodigo(): void {
        if (!this.frmCodigo.valid) {
            this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
        } else {
            this.fb.getData(tables.EDIFICIOS, this.frmCodigo.value.codigo).subscribe(edificio => {
                if (edificio.length > 0) 
                    this.navCtrl.navigate(['/registrar-usuarios', this.frmCodigo.value.codigo])
                 else 
                    this.utils.showToast(messages.INPUST_ERROR.NODATA, 1000).then(toasData => toasData.present()); 
            });
        }
    }

}

