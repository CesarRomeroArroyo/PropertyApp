import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { roles } from 'src/app/constants/roles';
import { states } from 'src/app/constants/states';
import { storage } from 'src/app/constants/storage';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  dato: any;
  states = states;
  roles = roles;
  valid: boolean = false;
  constructor(private navCtrl: Router,
    private util: UtilsService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.validationSession();
  }

  menuModal() {
    this.util.openModal();
  }

  logout(): void {
    localStorage.removeItem(storage.RESIDENTI_USER);
    localStorage.removeItem(storage.RESIDENTI_MODAL);
    localStorage.removeItem(storage.RESIDENTI_BUILDING);
    localStorage.removeItem(storage.RESIDENTI_APARTAMENT);
    this.closeMenu()
    this.navCtrl.navigate(['/login']);
  }

  validationSession(): void {
    this.dato = JSON.parse(localStorage.getItem(storage.RESIDENTI_USER));
    if (this.dato)
      this.valid = true;
  }

  closeMenu() {
    this.menu.enable(false);
  }

  redirectHome() {
    document.getElementById("home").classList.add("active");
    document.getElementById("evento").classList.remove("active");
    document.getElementById("usuarios").classList.remove("active");

    if (this.dato.tipo == roles.ADMIN)
     this.navCtrl.navigate(['/admin']);
    else {
      document.getElementById("mudanza").classList.remove("active");
      this.navCtrl.navigate(['/home']);
    }    
  }

  redirectEvent() {
    document.getElementById("evento").classList.add("active");
    document.getElementById("home").classList.remove("active");
    document.getElementById("usuarios").classList.remove("active");
    if(this.dato.tipo== roles.USER){
      document.getElementById("mudanza").classList.remove("active");
    }
    this.navCtrl.navigate(['/eventos']);
  }

  redirectUser() {
    document.getElementById("usuarios").classList.add("active");
    document.getElementById("home").classList.remove("active");
    document.getElementById("evento").classList.remove("active");
    if(this.dato.tipo== roles.USER){
      document.getElementById("mudanza").classList.remove("active");
    }
    this.navCtrl.navigate(['/lista-usuarios']);
  }

  miMudanza() {
    document.getElementById("mudanza").classList.add("active");
    document.getElementById("usuarios").classList.remove("active");
    document.getElementById("home").classList.remove("active");
    document.getElementById("evento").classList.remove("active");
    this.navCtrl.navigate(['/codigo-mudanza']);
  }

}
