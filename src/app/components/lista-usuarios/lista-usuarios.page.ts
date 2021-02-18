import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { roles } from 'src/app/constants/roles';
import { storage } from 'src/app/constants/storage';
import { Usermodel } from 'src/app/models/usuarios.model';
import { StateApp } from 'src/app/services/state.service';
import { states } from '../../constants/states';
import { tables } from '../../constants/tables';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  roles = roles;
  states = states;
  datoUser: Usermodel;
  userStorage: any;

  constructor(
    private fb: FirebaseService,
    private navCtrl: Router,
    private observable: StateApp
  ) { }

  ngOnInit() {
    this.listUsers();
  }

  listUsers(): void {
    this.userStorage = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER)); 
    if (this.userStorage.tipo == roles.ADMIN) {
      const edificio = JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING));
      this.fb.obtenerEdificio(tables.USERS, edificio).subscribe(data => this.datoUser= data);
    }
  }

  editUser(item): void {
    this.observable.setData([item]);
  this.navCtrl.navigate(['/editar-usuario']);
  }

  activeUser(item:Usermodel){
        this.fb.updateStateUSer(item);
  }
  
  disableUser(item:Usermodel){
    this.fb.updateStateUSer(item);
  }

}
