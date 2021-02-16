import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tables } from 'src/app/constants/tables';
import { FirebaseService } from '../../../services/firebase.service';
import { apartamento } from '../../../constants/states';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateApp } from 'src/app/services/state.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-mudanza',
  templateUrl: './mudanza.page.html',
  styleUrls: ['./mudanza.page.scss'],
})
export class MudanzaPage implements OnInit {

  
  frmMudanza : FormGroup

  apartamentosDisponible: any= [];
  edificio: any = {};
  private obs$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private frmbuilder: FormBuilder,
    private Router: ActivatedRoute,
    private fb: FirebaseService,
    private observale: StateApp) { }

  ngOnInit() {
    this.apartmentsAvaliable();
  }

  apartmentsAvaliable() {

    this.observale.getObservable().pipe(takeUntil(this.obs$)).subscribe(data=> this.edificio= data[0]);

    this.Router.params.subscribe(data => {
      this.fb.getData(tables.APARTAMENTS, data.id).subscribe(info => {
        info.forEach(element => (element.estado == apartamento.DESOCUPADO) ? this.apartamentosDisponible.push(element) : null);
      });

    });
  }


}
