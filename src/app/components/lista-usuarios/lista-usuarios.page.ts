import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roles } from 'src/app/constants/roles';
import { states } from '../../constants/states';
import { FirebaseService } from '../../services/firebase.service';

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
  ) { }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    const edificio = JSON.parse(localStorage.getItem("EDIFICIO"));

    this.user = JSON.parse(localStorage.getItem("IDUSER"));

    this.fb.obtenerEdificio("usuarios", edificio).subscribe(data => {
      data.forEach(element => {

        if (element.tipo != roles.ADMIN && this.dato == "")
          this.dato.push(element);

      });

    });
   
  }


  editUser(item) {
    this.navCtrl.navigate(['/editar-usuario', item.id]);
  }

}
