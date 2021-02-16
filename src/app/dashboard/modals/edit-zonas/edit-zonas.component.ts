import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { messages } from 'src/app/constants/messages';
import { tables } from 'src/app/constants/tables';
import { zonasComunesModel } from 'src/app/models/zonasComunes.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-zonas',
  templateUrl: './edit-zonas.component.html',
  styleUrls: ['./edit-zonas.component.scss'],
})
export class EditZonasComponent implements OnInit {

  frmZona: FormGroup;
  @Input() zonaComun: zonasComunesModel;

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
      nombre: [this.zonaComun.nombre, [Validators.required]],
      costo: [this.zonaComun.costo, [Validators.required]],
      descripcion: [this.zonaComun.descripcion, [Validators.required]]
    });
  }

  editZona(): void {
    if (!this.frmZona.valid)
      this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
    else {
      this.fbservice.actualizarDatos(tables.ZONASCOMUNES, this.frmZona.value, this.zonaComun.id);
      this.modalController.dismiss();
    }
  }
}

