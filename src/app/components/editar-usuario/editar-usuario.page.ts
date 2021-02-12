import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { storage } from 'src/app/constants/storage';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { apartamento } from '../../constants/states';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  dato: any = {};
  frmEditarUser: FormGroup;
  apartamentosAsignado: any = {};
  apartamentosDisponible: any = [];
  edificiosAdmin: any;
  edificios: any = {};

  constructor(private router: ActivatedRoute,
    private fb: FirebaseService,
    private frmbuild: FormBuilder) { }

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser():void {
    this.inicializarFrmUser();
    this.edificiosAdmin = JSON.parse(localStorage.getItem(storage.RESIDENTI_BUILDING));
    this.router.params.subscribe(data => {
      this.fb.getId(tables.USERS, data.id).subscribe(info => {

        this.dato = info;
        info.apartamento.forEach(element => this.apartamentosAsignado = element);

        info.edificios.forEach(element => this.edificios = element );

      });

    });

    this.fb.obtenerEdificio(tables.APARTAMENTS, this.edificiosAdmin).subscribe(data => {
      data.forEach(element => (element.estado === apartamento.DESOCUPADO) ? this.apartamentosDisponible.push(element) : null);
    });
  }

  inicializarFrmUser(dataUser?) {
    this.frmEditarUser = this.frmbuild.group({
      name: ['' || dataUser, [Validators.required]],
      apartamento: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      tipo: ['', Validators.required],
      estado: ['', [Validators.required]],
      edificio: ['', [Validators.required]],
      CC: ['', [Validators.required]]
    });
  }

  editUser() {
    if (!this.frmEditarUser.valid) {
      console.log("invalido");
      console.log(this.frmEditarUser.value);
    } else {
      console.log(this.frmEditarUser.value);
    }
  }

}
