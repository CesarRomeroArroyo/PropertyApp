import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roles } from 'src/app/constants/roles';
import { storage } from 'src/app/constants/storage';
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
    this.user = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER));
    if (this.user.tipo == roles.ADMIN) {
      const edificio = JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING));
      this.fb.obtenerEdificio(tables.USERS, edificio).subscribe(data => this.dato= data);
    }
  }

  editUser(item): void {
    this.observable.setData([item]);
    this.navCtrl.navigate(['/editar-usuario']);
  }

}
