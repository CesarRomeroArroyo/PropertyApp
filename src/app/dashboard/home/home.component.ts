import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { roles } from 'src/app/constants/roles';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  edificio = [];
  admin = [];
  codigo: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private fbservice: FirebaseService,
    private navCtr: Router
  ) { }

  ngOnInit() {
    this.getData();
    this.cargarUser();
  }

  getData(): void {
    this.activeRoute.params.subscribe(data => {
      this.codigo = data.id;
      this.fbservice.getData(tables.EDIFICIOS, data.id, "codigo").subscribe(data => {
        this.edificio.push(data[0]);
      });
    });
  }

  cargarUser(): void {
    this.fbservice.obtener(tables.USERS).subscribe(data => {
      data.forEach(element => (element.tipo === roles.ADMIN) ? this.admin.push(element) : null);
    });
  }

  finalize(): void {
    this.navCtr.navigate(['/dashboard']);
  }

}
