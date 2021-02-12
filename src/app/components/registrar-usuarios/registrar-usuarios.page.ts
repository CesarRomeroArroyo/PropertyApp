import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { inputs } from 'src/app/constants/inputs';
import { messages } from 'src/app/constants/messages';
import { roles } from 'src/app/constants/roles';
import { apartamento, states } from '../../constants/states';
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
	codigo: any;
	idu: any;
	apartamentos = [];
	edificios = [];

	constructor(
		private fbservice: FirebaseService,
		private utils: UtilsService,
		private navCtrl: Router,
		private loadCtrl: LoadingController,
		private frmbuilder: FormBuilder,
		private router: ActivatedRoute,
	) { }

	ngOnInit() {
		this.initializeFormRegister();
		this.getData();
	}

	async getData() {

		await this.router.params.subscribe(data => {
			this.codigo = data.id;
		});
		await this.fbservice.obtenerCodigo("apartamentos", this.codigo).subscribe(data => {
			data.forEach(info => {
				if (info.estado === apartamento.DESOCUPADO) {
					this.apartamentos.push(info);
				}
			});

		});

		await this.fbservice.obtenerCodigo("edificios", this.codigo).subscribe(data => {
			data.forEach(info => {
				this.edificios = info;

			});
		});


	}

	initializeFormRegister() {
		this.frmRegister = this.frmbuilder.group({
			email: ['', [Validators.required, Validators.pattern(inputs.EMAIL)]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			name: ['', [Validators.required, Validators.minLength(3)]],
			CC: ['', [Validators.required, Validators.minLength(6), Validators.pattern(inputs.NUMBER)]],
			user: ['', [Validators.required, Validators.minLength(3)]],
			tel: ['', [Validators.required, Validators.minLength(10), Validators.pattern(inputs.NUMBER)]],
			passConfirmation: ['', [Validators.required]],
			apartamento: ['', [Validators.required]]
		},
			{
				validators: validateEqual,
			}
		);
	}

	async registerUser() {
		if (!this.frmRegister.valid) {
			this.utils.showToast(messages.register.REQUIRED, 1000).then(toasData => toasData.present());

		} else {
			let loader = this.loadCtrl.create({
				message: "Por favor espere..."
			});
			(await loader).present();

			this.frmRegister.value.tipo = roles.USER;
			this.frmRegister.value.estado = states.ACTIVE;
			this.frmRegister.value.fechaCreacion = this.utils.fechaActual();
			this.frmRegister.value.edificios = this.edificios;

			try {
				await this.fbservice.registerUser(this.frmRegister.value);

				this.utils.doAlert(`${messages.register.SUCCESS} ${this.frmRegister.value.email}`).then(data => data.present());
				this.frmRegister.reset();
				this.navCtrl.navigate(['/login']);

			} catch (error) {
				if (error.code === messages.register.CODE_ERROR_EMAIL) {
					this.utils.showToast(messages.register.ERROR_EMAIL, 1000).then(toasData => toasData.present());
				}
			}
			(await loader).dismiss();
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