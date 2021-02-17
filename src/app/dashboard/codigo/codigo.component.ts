import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

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

export class CodigoComponent implements OnInit, OnDestroy {

  frmCodigo: FormGroup;
  private subCodigo: Subscription = null;

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

  ngOnDestroy() {
    this.subCodigo.unsubscribe();
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
      this.subCodigo = this.fbservice.getData(tables.EDIFICIOS, this.frmCodigo.value.codigo).subscribe(edificio => {
        if (edificio != "") {
          this.stateServis.setData(edificio);
          this.navCtrl.navigate(['/dashboard/home']);
        } else
          this.utils.showToast(messages.INPUST_ERROR.NODATA, 1000).then(toasData => toasData.present());
      });
    }
  }
}
