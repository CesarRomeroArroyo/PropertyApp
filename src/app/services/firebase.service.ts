import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { messages } from '../constants/messages';
import { roles } from '../constants/roles';
import {  apartamento, states } from '../constants/states';
import { UserAuthentication,Usermodel  } from '../models/usuarios.model';
import { UtilsService } from './utils.service';
import * as firebase from 'firebase/app';

import { edificiosModels } from '../models/edificios.models';
import { userAdminModel } from '../models/usuariosAdmin.models';
import { apartamentosModel } from '../models/apartamentos.model';

@Injectable({
	providedIn: 'root'
})
export class FirebaseService {

	items: Observable<any[]>;

	private itemsCollection: AngularFirestoreCollection<any>;

	constructor(
		private db: AngularFirestore,
		private afAuth: AngularFireAuth,
		private navCtrl: Router,
		private utils: UtilsService
	) { }

	obtener(tabla): Observable<any> {
		this.itemsCollection = this.db.collection(tabla);
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	async obtenerPromise(tabla, show?) {
		let returnData = [];
		var data = await this.db.collection(tabla).get().toPromise();
		data.forEach(info => {
			var d = info.data();
			d["id"] = info.id;
			returnData.push(d);
		});
		return returnData;
	}

	obtenerId(tabla, id, show?): Observable<any> {
		this.itemsCollection = this.db.collection(tabla, ref => ref.where('id', '==', id));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	async obtenerIdPromise(tabla, id, show?) {
		let returnData = [];
		var data = await this.db.collection(tabla, ref => ref.where('id', '==', id)).get().toPromise();
		data.forEach(info => {
			var d = info.data();
			d["id"] = info.id;
			returnData.push(d);
		});
		return returnData;
	}


	async obtenerXFechaPromise(tabla, id, show?) {
		let returnData = [];
		var data = await this.db.collection(tabla, ref => ref.where('fecha', '==', id)).get().toPromise();
		data.forEach(info => {
			var d = info.data();
			d["id"] = info.id;
			returnData.push(d);
		});
		return returnData;
	}

	obtenerUniqueId(tabla, id): Observable<any> {
		this.itemsCollection = this.db.collection(tabla, ref => ref.where('idunico', '==', id));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}


	async obtenerUniqueIdPromise(tabla, id) {
		let returnData = [];
		var data = await this.db.collection(tabla, ref => ref.where('idunico', '==', id)).get().toPromise();
		data.forEach(info => {
			var d = info.data();
			d["id"] = info.id;
			returnData.push(d);
		});
		return returnData;
	}

	obtenerLogin(user, pass): Observable<any> {
		this.itemsCollection = this.db.collection('usuarios', ref => ref.where('usuario', '==', user).where('password', '==', pass));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	async obtenerLoginPromise(userAuth: UserAuthentication) {

		let returnData = [];
		var data = await this.db.collection('usuarios', ref => ref.where('email', '==', userAuth.user)).get().toPromise();

		data.forEach(info => {
			console.log("info" + info);
			var d = info.data();
			d["id"] = info.id;
			returnData.push(d);
		});

		return returnData;
	}

	async existsEmail(email: string) {
		let exit = false;
		var data = await this.db.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();

		data.forEach(info => {
			exit = info.exists;
		});
		return exit;
	}

	obtenerChat(id) {
		this.itemsCollection = this.db.collection('chat', ref => ref.where('uniqueId', '==', id));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	obtenerChatReceptor(idReceptor) {
		this.itemsCollection = this.db.collection('chat', ref => ref.where('receptor', '==', idReceptor));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	obtenerChatEmisor(idEmisor) {
		this.itemsCollection = this.db.collection('chat', ref => ref.where('emisor', '==', idEmisor));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	guardarDatos(tabla: string, data) {
		this.itemsCollection = this.db.collection<any>(tabla);
		return this.itemsCollection.add(JSON.parse(JSON.stringify(data))).then(
			(resp) => {
				return resp.id;
			}
		).catch(() => {
			return false;
		});
	}

	actualizarDatos(tabla, data, id) {
		this.itemsCollection = this.db.collection<any>(tabla);
		return this.itemsCollection.doc(id).update(JSON.parse(JSON.stringify(data))).then(
			() => {
				return true;
			}
		).catch(() => {
			return false;
		});
	}

	eliminarDatos(tabla: string, id: any) {
		this.itemsCollection = this.db.collection<any>(tabla);
		this.itemsCollection.doc(id).delete().then(
			() => {
				return true;
			}
		).catch(() => {
			return false;
		});
	}

	async login(email: string, password: string) {
		try {
			const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
			return user;

		} catch (error) {
			console.log('Error->', error);
		}
	}


	async sendVerifcationEmail(): Promise<void> {
		try {
			return (await this.afAuth.currentUser).sendEmailVerification();
		} catch (error) {
			console.log('Error->', error);
		}
	}

	async resetPassword(email: string) {
		try {
			return await this.afAuth.sendPasswordResetEmail(email);
		} catch (error) {
			console.log(error);
		}
	}

	async validationLogin(user: any, frmAuth: FormGroup) {

		if (user != null) {
			if (user.emailVerified != false) {
				const userlogin = await this.obtenerLoginPromise(frmAuth.value);

				if (frmAuth.value.check) {
					localStorage.setItem("REMEMBER_USER", JSON.stringify(frmAuth.value));
				} else {
					localStorage.removeItem("REMEMBER_USER");
					frmAuth.reset();
				}
				localStorage.setItem("IDUSER", JSON.stringify(userlogin[0]));
				localStorage.setItem("MODAL", JSON.stringify(true));
				if (userlogin.length > states.EXISTS) {
					if (userlogin[0].estado === states.ACTIVE) {

						if (userlogin[0].tipo == roles.USER)
							this.navCtrl.navigate(['/home']);
						else
							this.navCtrl.navigate(['/admin']);
					} else
						this.navCtrl.navigate(['/cuenta-desabilitada']);
				}
			} else {
				this.utils.showToast(messages.login.ERRORVERIFIED, 3000).then(toasData => toasData.present());
			}

		} else {
			this.utils.showToast(messages.login.INVALIDCREDENTIALS, 3000).then(toasData => toasData.present());
		}
	}

	obtenerCodigo(tabla, codigo, show?): Observable<any> {
		this.itemsCollection = this.db.collection(tabla, ref => ref.where('codigo', '==', codigo));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	async registerUser(userAuth: Usermodel): Promise<any> {
		await this.afAuth.createUserWithEmailAndPassword(userAuth.email, userAuth.password).then(cred => {
			return this.db.collection("usuarios").doc(cred.user.uid).set({
				CC: userAuth.CC,
				codigoEdificios: userAuth.codigoEdificios,
				estado: userAuth.estado,
				fechaCreacion: userAuth.fechaCreacion,
				name: userAuth.name,
				tel: userAuth.tel,
				tipo: userAuth.tipo,
				tipoInquilino: userAuth.tipoInquilino,
				email: userAuth.email,
				apartamentos: [userAuth.apartamento]
			}).then(() => {
				return this.db.doc(`${"apartamentos"}/${userAuth.apartamento.id}`).update({ "estado": apartamento.OCUPADO });
			});
		});
		await this.sendVerifcationEmail();
	}

	assignBuilding(edificio: edificiosModels, id: string): void {
		this.db.collection('usuarios').doc(id).update({
			edificios: firebase.firestore.FieldValue.arrayUnion(edificio)
		});
	}

	async assignApartment(apartmet: apartamentosModel, id: string): Promise<any> {
		await this.db.doc(`${"apartamentos"}/${apartmet.id}`).update({
			"estado": apartamento.OCUPADO,
		});
		this.db.collection('usuarios').doc(id).update({
			apartamentos: firebase.firestore.FieldValue.arrayUnion(apartmet)
		});
	}

	removeBuilding(edificio: edificiosModels, id: string): void {
		this.db.collection('usuarios').doc(id).update({
			edificios: firebase.firestore.FieldValue.arrayRemove(edificio)
		});
	}

	async removeApartment(apartment: apartamentosModel, id: string): Promise<any> {
		await this.db.doc(`${"apartamentos"}/${apartment.id}`).update({
			"estado": apartamento.DESOCUPADO,
		});
		this.db.collection('usuarios').doc(id).update({
			apartamentos: firebase.firestore.FieldValue.arrayRemove(apartment)
		});
	}

	getData(tabla: string, codigoEdificio: string): Observable<any> {
		this.itemsCollection = this.db.collection(tabla, ref => ref.where("codigoEdificio", '==', codigoEdificio));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	obtenerEdificio(tabla, codigo, show?): Observable<any> {
		this.itemsCollection = this.db.collection(tabla, ref => ref.where('codigoEdificios', 'array-contains', codigo));
		return this.itemsCollection.snapshotChanges().pipe(
			map(data => {
				return data.map(d => {
					const retorno = d.payload.doc.data();
					retorno['id'] = d.payload.doc.id;
					return retorno;
				});
			})
		);
	}

	getId(tabla: string, id: string): Observable<any> {
		return this.db.doc(`${tabla}/${id}`).valueChanges();
	}

	async registrerAdmin(userAdmin: userAdminModel): Promise<any> {
		await this.afAuth.createUserWithEmailAndPassword(userAdmin.email, userAdmin.password).then(cred => {
			return this.db.collection("usuarios").doc(cred.user.uid).set({
				name: userAdmin.name,
				email: userAdmin.email,
				tipo: userAdmin.tipo,
				estado: userAdmin.estado
			}
			)
		});
		await this.sendVerifcationEmail();
	}
}
