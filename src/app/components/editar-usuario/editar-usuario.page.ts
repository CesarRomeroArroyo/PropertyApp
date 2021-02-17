import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { storage } from 'src/app/constants/storage';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StateApp } from 'src/app/services/state.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  dato = [];
  frmEditarUser: FormGroup;

  apartamentosAsignados: any = {};
  apartamentosDisponible: any = [];
  codigoEdificios: any;
  edificios: any = {};

  private obs$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FirebaseService,
    private frmbuild: FormBuilder,
    private stateServis: StateApp) { }

  ngOnInit() {
    this.getDataUser();
    this.inicializarFrmUser(this.dato);

    console.log(this.apartamentosAsignados)
  }

  getDataUser(): void {
    this.codigoEdificios = JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING));
    this.stateServis.getObservable().pipe(takeUntil(this.obs$)).subscribe(info => this.dato = info[0]);
  }

  inicializarFrmUser(dataUser?): void {

    this.frmEditarUser = this.frmbuild.group({
      name: ['' || dataUser.name, [Validators.required]],
      tel: ['' || dataUser.tel, [Validators.required]],
      tipo: [`${dataUser.tipo}`, Validators.required],
      estado: [`${dataUser.estado}`, [Validators.required]],
      CC: ['' || dataUser.CC, [Validators.required]]
    });
  }

  editUser(): void {
    if (!this.frmEditarUser.valid) {
      console.log("invalido");

      this.frmEditarUser.patchValue({estado: parseInt(this.frmEditarUser.value.estado)});
      console.log(this.frmEditarUser.value);
    } else {
      this.frmEditarUser.patchValue({estado: parseInt(this.frmEditarUser.value.estado)});
      console.log(this.frmEditarUser.value);
    }
  }

}
