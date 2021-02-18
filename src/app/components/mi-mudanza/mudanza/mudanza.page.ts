import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { tables } from 'src/app/constants/tables';
import { FirebaseService } from '../../../services/firebase.service';
import { apartamento } from '../../../constants/states';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateApp } from 'src/app/services/state.service';
import { apartamentosModel } from 'src/app/models/apartamentos.model';
import { storage } from '../../../constants/storage';


@Component({
  selector: 'app-mudanza',
  templateUrl: './mudanza.page.html',
  styleUrls: ['./mudanza.page.scss'],
})
export class MudanzaPage implements OnInit {

  frmMoving: FormGroup
  apartamentosDisponible: any = [];
  edificio: apartamentosModel;
  private obs$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private frmbuilder: FormBuilder,
    private Router: ActivatedRoute,
    private fb: FirebaseService,
    private observale: StateApp,
    private navCtrl: Router) { }

  ngOnInit() {
    this.initializeFormMoving();
    this.apartmentsAvaliable();
  }

  apartmentsAvaliable(): void {
    this.observale.getObservable().pipe(takeUntil(this.obs$)).subscribe(data => this.edificio = data[0]);
    this.Router.params.subscribe(data => {
      this.fb.getData(tables.APARTAMENTS, data.id).subscribe(info => {
        info.forEach(element => (element.estado == apartamento.DESOCUPADO) ? this.apartamentosDisponible.push(element) : null);
      });
    });
  }

  initializeFormMoving(): void {
    this.frmMoving = this.frmbuilder.group({
      apartaments: ['', [Validators.required]],
    });
  }

  changeBuilding() {
    if (this.frmMoving.invalid) {
      console.log(this.frmMoving.value);
    } else {
      const user = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER));
      const apartaments = JSON.parse(localStorage.getItem(storage.RESIDENTI_APARTAMENT));

      this.fb.changeBuildingAndApartament(this.frmMoving.value.apartaments, apartaments, user.id);
      this.navCtrl.navigate(['/home']); 
    }
  }
}
