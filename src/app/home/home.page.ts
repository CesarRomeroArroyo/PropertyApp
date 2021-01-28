import { Component } from '@angular/core';
import { FileManagerService } from '../services/file-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


    dato :any=[];
  constructor(
    private fileManager: FileManagerService,
    private navCtrl: Router
  ) {}

  async fileChangeEvent(e: any){
		var fileName = e[0];
    var fileupload = await this.fileManager.upload(fileName, 'prueba');
    var url = await this.fileManager.uploadURL;
    console.log(fileupload)
    console.log(url)
  }
  

/*   ionViewWillEnter(){
    const user = JSON.parse(localStorage.getItem('IDUSER'));
   
    console.log(user);
    if(user){
      this.dato= user;
      this.navCtrl.navigate(['/home']);
    }

} */
 }
