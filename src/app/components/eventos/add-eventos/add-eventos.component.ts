import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';
import { tables } from '../../../constants/tables';
import { zonasComunesModel } from '../../../models/zonasComunes.models';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UtilsService } from '../../../services/utils.service';
import { stateEvent } from '../../../constants/states';
import { storage } from '../../../constants/storage';
import { getTestBed } from '@angular/core/testing';
import { eventosModel } from '../../../models/eventos.model';

@Component({
  selector: 'app-add-eventos',
  templateUrl: './add-eventos.component.html',
  styleUrls: ['./add-eventos.component.scss'],
})
export class AddEventosComponent implements OnInit, OnDestroy {

  @Input() fecha: Date;
  @Input() fechaString: string;
  @Input() eventDaySelect: any;

  zoneCommon: zonasComunesModel;
  frmEvent: FormGroup;
  private subAddEvent: Subscription = null;
  horas: any;
  horaFin: any;
  customPickerOptions: any;
  dateFormat: string;
  horaIni:Date;
  horaFinal: any = [];

  constructor(
    private fb: FirebaseService,
    private frmBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private utils: UtilsService) { }

  ngOnInit(): void {
    this.dateFormat = this.fechaString;
    this.fecha.setDate(this.fecha.getDate() + 1);
    this.fecha.setHours(0);
    this.fecha.setMinutes(0);
    this.getDataZoneCommon();
    this.initializateFrmEvent();
    this.dateInitial();
  }


  dateInitial(){
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: (data => {
          this.fecha.setHours(data.hour.value);
          this.horas = (new Date(this.fecha));
          
       console.log(this.horas);
           
          for (let i = 0; i < 23; i++) {
            if (i > data.hour.value)        
              this.horaFinal.push(i);                     
          } 
               
        })
      },
      {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }

  }

  ngOnDestroy(): void {
    this.subAddEvent.unsubscribe();
  }

  initializateFrmEvent(): void {
    this.frmEvent = this.frmBuilder.group({
      zoneCommon: ['', [Validators.required]],
      timeInitial: ['', [Validators.required]],
      timeEnd: ['', [Validators.required]],
      dateEvent:[this.dateFormat,[Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      user: [JSON.parse( localStorage.getItem(storage.RESIDENTI_USER))],
      apartamentUser: [JSON.parse( localStorage.getItem(storage.RESIDENTI_APARTAMENT))],
      state:[stateEvent.ACTIVE]
    });
  }

  getDataZoneCommon(): void {
    this.subAddEvent = this.fb.obtener(tables.ZONASCOMUNES).subscribe(data => this.zoneCommon = data);
  }


  saveDataEvent() {
    if (this.frmEvent.invalid) 
    this.utils.showToast("Error en datos", 1000).then(data => data.present());
    else {
      this.frmEvent.value.timeEnd=new Date(this.frmEvent.value.timeEnd).toString();
      this.fb.guardarDatos(tables.EVENTS,this.frmEvent.value);
      this.closeModal();
    
    }
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }

  changeZoneCommon($event){
      console.log(this.eventDaySelect);
    this.eventDaySelect.forEach(element => {

        if(element.zoneCommon===($event) ){
            console.log(element);
        } 
    });
  }

}
