import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { messages } from 'src/app/constants/messages';
import { apartamento } from 'src/app/constants/states';
import { tables } from 'src/app/constants/tables';
import { edificiosModels } from 'src/app/models/edificios.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-zonas',
  templateUrl: './add-zonas.component.html',
  styleUrls: ['./add-zonas.component.scss'],
})
export class AddZonasComponent implements OnInit {

  @Input() edificio: edificiosModels;
  frmZonas: FormGroup;

  constructor(
    private modalController: ModalController,
    private frmbuild: FormBuilder,
    private fbservice: FirebaseService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.initializateFrmZonas();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  initializateFrmZonas() {
    this.frmZonas = this.frmbuild.group({
      nombre: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      descripcion: ["", [Validators.required]],
      estado: [apartamento.DESOCUPADO, [Validators.required]],
      edificios: [this.edificio, [Validators.required]],
      codigoEdificio: [this.edificio[0].codigoEdificio, [Validators.required]]
    });
  }

  addZona() {
    if (!this.frmZonas.valid) {
      this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
    } else {
      this.fbservice.guardarDatos(tables.ZONASCOMUNES, this.frmZonas.value);
      this.modalController.dismiss();
    }
  }
}
