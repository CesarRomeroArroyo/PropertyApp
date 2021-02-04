import { Component, OnInit } from '@angular/core';
import { states } from '../../constants/states';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {


  dato: any;
  constructor(private fb: FirebaseService,
    private navCtrl: Router) { }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.fb.obtener("usuarios").subscribe(data => {
      this.dato = data;
    });
  }

  changeStatus(item: any, id: string) {
    if (item.estado === states.DISABLED) {
      item.estado = states.ACTIVE;
    } else {
      item.estado = states.DISABLED;
    }
    this.fb.actualizarDatos("usuarios", item, id);
  }


   async deleteUser(id: string, email: string,pass:string ) {
       const user=  await this.fb.login(email,pass) 
       user.delete();
      await  this.fb.eliminarDatos("usuarios",id);
  } 


  editUser(id:string){
    this.navCtrl.navigate(['/editar-usuario',id])
  }

  
}
