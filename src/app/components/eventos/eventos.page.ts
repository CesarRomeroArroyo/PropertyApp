import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';
import { AddEventosComponent } from './add-eventos/add-eventos.component';
import { UtilsService } from '../../services/utils.service';
import { messages } from '../../constants/messages';
import { FirebaseService } from '../../services/firebase.service';

import { tables } from '../../constants/tables';
import { Subscription } from 'rxjs';
import { eventosModel } from '../../models/eventos.model';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventosPage implements OnInit, OnDestroy {

  type = 'string';
  fecha: Date;
  fechaString: string;
  event:eventosModel;
  subEvent: Subscription = null;

  optionsRange: CalendarComponentOptions = {
    weekdays: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    color: 'dark',
    daysConfig: [],
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGOS', 'SEP', 'OCT', 'NOV', 'DIC'],
    pickMode: 'single',
  };

  constructor(
    private modalCtrl: ModalController,
    private utils: UtilsService,
    private fb: FirebaseService) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subEvent.unsubscribe();
  }

  onChange($event) {
    this.fecha = new Date($event);
    this.fechaString = $event;
    this.subEvent = this.fb.obtenerDataGeneral(tables.EVENTS, $event, "dateEvent").subscribe(data => {
      this.event = data;
    });
  }

  async addModalEvent() {
    if (this.fecha == undefined)
      this.utils.showToast(messages.eventos.EMPTY_FIELDS_EVENT, 1000).then(toasData => toasData.present());
    else {
      const modal = await this.modalCtrl.create({
        component: AddEventosComponent,
        componentProps: { fecha: this.fecha, fechaString: this.fechaString,eventDaySelect:this.event }
      });
      await modal.present()
    }
  }

}
