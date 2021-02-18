import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { messages } from 'src/app/constants/messages';
import { roles } from 'src/app/constants/roles';
import { tables } from 'src/app/constants/tables';
import { Usermodel } from 'src/app/models/usuarios.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StateApp } from 'src/app/services/state.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})

export class EditarUsuarioPage implements OnInit, OnDestroy {

  userData: Usermodel;
  frmEditarUser: FormGroup;
  idUser: string;
  roles = roles;

  private obs$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FirebaseService,
    private frmbuild: FormBuilder,
    private utils: UtilsService,
    private stateServis: StateApp,
    private navCtrl: Router
  ) { }

  ngOnInit() {
    this.getDataUser();
    this.inicializarFrmUser(this.userData);
  }

  ngOnDestroy() {
    this.obs$.next(true);
    this.obs$.unsubscribe();
  }

  getDataUser(): void {
    this.stateServis.getObservable().pipe(takeUntil(this.obs$)).subscribe(info => {
      this.userData = info[0];
      this.idUser = info[0].id;
    });
  }

  inicializarFrmUser(dataUser: Usermodel): void {
    this.frmEditarUser = this.frmbuild.group({
      name: ['' || dataUser.name, [Validators.required]],
      tel: ['' || dataUser.tel, [Validators.required]],
      tipo: [dataUser.tipo, Validators.required],
      estado: [`${dataUser.estado}`, [Validators.required]],
      CC: ['' || dataUser.CC, [Validators.required]]
    });
  }

  editUser(): void {
    if (!this.frmEditarUser.valid)
      this.utils.showToast(messages.INPUST_ERROR.REQUIRID, 1000).then(toasData => toasData.present());
    else {
      this.frmEditarUser.patchValue({ estado: parseInt(this.frmEditarUser.value.estado) });

      this.fb.actualizarDatos(tables.USERS, this.frmEditarUser.value, this.idUser).then(inf => {
        if (inf) {
          this.utils.showToast(messages.PROCESOS.UPDATE, 1000).then(toasData => toasData.present());
          this.navCtrl.navigate(['/lista-usuarios']);
        } else
          this.utils.showToast(messages.PROCESOS.ERROR, 1000).then(toasData => toasData.present());
      });
    }
  }

}
