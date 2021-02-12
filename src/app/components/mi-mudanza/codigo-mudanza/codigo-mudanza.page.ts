import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-codigo-mudanza',
  templateUrl: './codigo-mudanza.page.html',
  styleUrls: ['./codigo-mudanza.page.scss'],
})
export class CodigoMudanzaPage implements OnInit {

  frmCodigo: FormGroup;
  edificio: any = [];
  constructor(
    private frmbuilder: FormBuilder,
    private navCtrl: Router,
    private fb: FirebaseService
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
      this.fb.obtenerCodigo("edificios", this.frmCodigo.value.codigo).subscribe(data => {
        this.edificio = data;
        if (data != "") {
          this.navCtrl.navigate(['/mudanza', this.frmCodigo.value.codigo]);
        } else {
          console.log("erroneo");
        }
      });
    }
  }
}
