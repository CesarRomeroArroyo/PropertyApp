import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  
  dato: any  ={};
  constructor(private router: ActivatedRoute,
    private fb: FirebaseService) { }

  ngOnInit() {
    this.getDatosU();
  }
    getDatosU(){
      this.router.params.subscribe(data=>{
        
        this.fb.obtenerId("usuarios",data.id).subscribe(info=>{


         this.dato =  info[0];
         console.log(info[0]);
        });
      })
    }
}
