import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { roles } from 'src/app/constants/roles';
import { storage } from 'src/app/constants/storage';
import { tables } from '../../constants/tables';
import { FirebaseService } from '../../services/firebase.service';
import { StateApp } from 'src/app/services/state.service';
import { Subscription } from 'rxjs';
import { userAdminModel } from 'src/app/models/usuariosAdmin.models';
import { Usermodel } from 'src/app/models/usuarios.model';
import { states } from 'src/app/constants/states';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})

export class ListaUsuariosPage implements OnInit, OnDestroy {

  datauser: Usermodel;
  dataAdmin: userAdminModel;
  roles = roles;
  states = states;
  private subcripcionEdificio: Subscription = null;

  constructor(
    private fb: FirebaseService,
    private navCtrl: Router,
    private observable: StateApp
  ) { }

  ngOnInit() {
    this.listUsers();
  }

  ngOnDestroy() {
    this.subcripcionEdificio.unsubscribe();
  }

  listUsers(): void {
    const edificio = JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING));
    this.dataAdmin = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER));
    this.subcripcionEdificio = this.fb.obtenerEdificio(tables.USERS, edificio).subscribe(user => {
      this.datauser = user;
    });
  }

  editUser(user: Usermodel): void {
    this.observable.setData([user]);
    this.navCtrl.navigate(['/editar-usuario']);
  }

}
