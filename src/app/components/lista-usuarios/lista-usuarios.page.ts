import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {


    dato:any;
  constructor(private fb: FirebaseService) { }

  ngOnInit() {
    this.listUsers();
  }
  listUsers(){
  this.fb.obtener("usuarios").subscribe(data=>{
    this.dato= data;
  
  });   
   
  }
}
