import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateApp } from 'src/app/services/state.service';

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
    private stateServis: StateApp
  ) { }

  ngOnInit() {
    this.initializeFormCodigo();
  }

  initializeFormCodigo() {
    this.frmCodigo = this.frmbuilder.group(
      {
        codigo: ['', [Validators.required]]
      }
    );
  }

  setCodigo() {
    if (!this.frmCodigo.valid) {

    } else {
      this.stateServis.setData(this.frmCodigo.value);
      this.navCtrl.navigate(['/registrar-usuarios']);
    }

  }

}
