import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { roles } from 'src/app/constants/roles';
import { tables } from 'src/app/constants/tables';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StateApp } from 'src/app/services/state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  edificio = [];
  codigo: any;
  private obs$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private navCtr: Router,
    private stateServis: StateApp
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.stateServis.getObservable().pipe(takeUntil(this.obs$)).subscribe(data => {
        this.edificio.push(data[0]);
    });
  }

  finalize(): void {
    this.navCtr.navigate(['/dashboard']);
  }

}
