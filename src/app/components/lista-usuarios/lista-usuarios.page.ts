import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { roles } from 'src/app/constants/roles';
import { storage } from 'src/app/constants/storage';
import { tables } from '../../constants/tables';
import { FirebaseService } from '../../services/firebase.service';
import { StateApp } from 'src/app/services/state.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  dato: any = [];
  user: any;

  constructor(
    private fb: FirebaseService,
    private navCtrl: Router,
    private observable: StateApp
  ) { }

  ngOnInit() {
    this.listUsers();
  }

  listUsers(): void {
    const edificio = JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING));
    this.user = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER));

    this.fb.obtenerEdificio(tables.USERS, edificio).subscribe(data => {
      data.forEach(element => (element.tipo != roles.ADMIN && this.dato == "") ? this.dato.push(element) : null);
    });

  }

  editUser(item): void {

    this.observable.setData([item]);
    this.navCtrl.navigate(['/editar-usuario']);
  }

}
