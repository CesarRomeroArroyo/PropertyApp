import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { edificiosModels } from 'src/app/models/edificios.models';
import { StateApp } from 'src/app/services/state.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

	edificio: edificiosModels;
	codigo: string;
	private obs$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private navCtr: Router,
		private stateServis: StateApp
	) { }

	ngOnInit() {
		this.getData();
	}

	ngOnDestroy() {
		this.obs$.next(true);
		this.obs$.unsubscribe();
	}

	getData(): void {
		this.stateServis.getObservable().pipe(takeUntil(this.obs$)).subscribe(edificio => {
			this.edificio =edificio;
		});
	}

	finalize(): void {
		this.navCtr.navigate(['/dashboard']);
	}

}
