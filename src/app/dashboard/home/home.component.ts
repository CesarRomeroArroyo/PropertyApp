import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateApp } from 'src/app/services/state.service';

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
