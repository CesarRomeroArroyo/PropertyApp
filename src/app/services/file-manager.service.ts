import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
@Injectable({
	providedIn: 'root'
})
export class FileManagerService {
	uploadProgress: Observable<number>;
	uploadURL: Promise<string>;
	estado = new BehaviorSubject({});
	fileReference: AngularFireStorageReference;
	constructor(private storage: AngularFireStorage, 
		public loadingController: LoadingController) {
	}

	async upload(file, filepath): Promise<any> {
		this.estado.next(true);
		const fileRef = this.storage.ref(filepath);
		const loading = await this.loadingController.create({
			message: 'Espere por favor, Cargando el archivo...'
		  });
		await loading.present();
		const task = this.storage.upload(filepath, file);
 		this.uploadProgress = task.percentageChanges();
		return task.snapshotChanges().pipe(
			finalize(async () => {
				this.uploadURL = fileRef.getDownloadURL().toPromise();
				this.estado.next(false);
				loading.dismiss();
			})
		).toPromise();
	}

	async uploadImageBase64(file: string, filepath): Promise<any> {
		this.estado.next(true);
		const fileRef = this.storage.ref(filepath);
		const loading = await this.loadingController.create({
			message: 'Espere por favor, Cargando el archivo...'
		  });
		await loading.present();
		var image = 'data:image/jpg;base64,' + file;
		var task = this.storage.ref(filepath).putString(image, 'data_url');
		this.uploadProgress = task.percentageChanges();
		return task.snapshotChanges().pipe(
			finalize(async () => {
				this.uploadURL = fileRef.getDownloadURL().toPromise();
				this.estado.next(false);
				loading.dismiss();
			})
		).toPromise();
	}

	deleteFilesFolder(path) {
		return this.storage.ref(path).delete();
	}

	getEstado() {
		return this.estado.asObservable();
	}

	getUrlFileInfo(path) {
		return this.storage.ref(path).getDownloadURL();
	}

	getUrlFile(){
		setTimeout(() => {
			return this.uploadURL;
		}, 500);
	}


}
