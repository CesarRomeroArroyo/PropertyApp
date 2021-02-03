import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { inputs } from 'src/app/constants/inputs';
import { messages } from 'src/app/constants/messages';
import { roles } from 'src/app/constants/roles';
import { StateApp } from 'src/app/services/state.service';
import { states } from '../../constants/states';
import { validateEqual } from '../../constants/validadorEqual';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
@Component({
	selector: 'app-registrar-usuarios',
	templateUrl: './registrar-usuarios.page.html',
	styleUrls: ['./registrar-usuarios.page.scss'],
})

export class RegistrarUsuariosPage implements OnInit {

	frmRegister: FormGroup;
	errorInpus = messages.INPUSTERROR;
	codeError: boolean;
	codigo: string;
	private obs$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private fbservice: FirebaseService,
		private utils: UtilsService,
		private navCtrl: Router,
		private loadCtrl: LoadingController,
		private frmbuilder: FormBuilder,
		private stateServis: StateApp
	) { }

	ngOnInit() {
		this.initializeFormRegister();
		this.getData();
	}

	ngOnDestroy() {
		this.obs$.next(true);
		this.obs$.unsubscribe();
	}

	getData() {
		this.stateServis.getObservable().pipe(takeUntil(this.obs$)).subscribe((data) => {
			this.codigo = data.codigo;
		})
	}
	
	initializeFormRegister() {
		this.frmRegister = this.frmbuilder.group(
			{
				email: ['', [Validators.required, Validators.pattern(inputs.EMAIL)]],
				password: ['', [Validators.required, Validators.minLength(8)]],
				name: ['', [Validators.required, Validators.minLength(3)]],
				CC: ['', [Validators.required, Validators.minLength(6), Validators.pattern(inputs.NUMBER)]],
				user: ['', [Validators.required, Validators.minLength(3)]],
				tel: ['', [Validators.required, Validators.minLength(10), Validators.pattern(inputs.NUMBER)]],
				passConfirmation: ['', [Validators.required]],
			},
			{
				validators: validateEqual,
			}
		);
	}

	ionViewWillEnter() {

	}

	async registerUser() {
		if (!this.frmRegister.valid) {
			this.utils.showToast(messages.register.REQUIRED, 1000).then(toasData => toasData.present());

		} else {
			await this.fbservice.registerUser(this.frmRegister.value)
				.then(data => this.codeError = data);

			if (!this.codeError) {
				this.utils.showToast(messages.register.ERROR_EMAIL, 1000).then(toasData => toasData.present());
			} else {
				let loader = this.loadCtrl.create({
					message: "Por favor espere..."
				});
				(await loader).present();

				this.frmRegister.value.tipo = roles.USER;
				this.frmRegister.value.estado = states.ACTIVE;
				this.frmRegister.value.fechaCreacion = this.utils.fechaActual();
				this.frmRegister.value.apartamentoid = this.codigo;

				let data = await this.fbservice.guardarDatos("usuarios", this.frmRegister.value);

				if (data !== null) {
					this.utils.doAlert(`${messages.register.SUCCESS} ${this.frmRegister.value.email}`).then(data => data.present());
					this.frmRegister.reset();
					this.navCtrl.navigate(['/login']);
				} else {
					this.utils.doAlert(messages.register.ERROR).then(data => data.present());
				}
				(await loader).dismiss();
			}
		}
	}

	get name() {
		return this.frmRegister.get("name");
	}
	get email() {
		return this.frmRegister.get("email");
	}
	get CC() {
		return this.frmRegister.get('CC');
	}
	get user() {
		return this.frmRegister.get('user');
	}
	get password() {
		return this.frmRegister.get('password');
	}
	get passConfirmation() {
		return this.frmRegister.get('password');
	}
	get tel() {
		return this.frmRegister.get('tel');
	}

	validateEqual(): boolean {
		return this.frmRegister.hasError('noSonIguales') &&
			this.frmRegister.get('password').dirty &&
			this.frmRegister.get('passConfirmation').dirty;
	}
}