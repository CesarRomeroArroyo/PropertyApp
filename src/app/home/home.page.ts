import { Component } from '@angular/core';
import { FileManagerService } from '../services/file-manager.service';
import { UtilsService } from '../services/utils.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fileManager: FileManagerService,
    private util: UtilsService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.util.sessionActive();
  }

  async fileChangeEvent(e: any) {
    var fileName = e[0];
    var fileupload = await this.fileManager.upload(fileName, 'prueba');
    var url = await this.fileManager.uploadURL;
    console.log(fileupload)
    console.log(url)
  }

}
