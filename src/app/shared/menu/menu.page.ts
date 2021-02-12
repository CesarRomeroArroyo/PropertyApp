import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  dato: any;
  constructor(private navCtrl: Router,
    private util: UtilsService,
    private menu: MenuController
  ) { }

  ngOnInit() {

  }

  menuModal(){
    this.util.openModal();
  }

  logout() {
  
    localStorage.removeItem("IDUSER");
    this.navCtrl.navigate(['/login']);
  }

  ValidationSession() {

    this.dato = JSON.parse(localStorage.getItem('IDUSER'));
    if (this.dato)
      return true;
    else
      return false
  }

  closeMenu() {
    this.menu.close("main-menu");
  }

  redirectHome() {
    document.getElementById("home").classList.add("active");
    document.getElementById("evento").classList.remove("active");
    document.getElementById("usuarios").classList.remove("active");
    document.getElementById("mudanza").classList.remove("active");
    this.navCtrl.navigate(['/admin']);

  }

  redirectEvent() {
    document.getElementById("evento").classList.add("active");
    document.getElementById("home").classList.remove("active");
    document.getElementById("usuarios").classList.remove("active");
    document.getElementById("mudanza").classList.remove("active");
    
    this.navCtrl.navigate(['/home']);
  }
  redirectUser() {
    document.getElementById("usuarios").classList.add("active");
    document.getElementById("home").classList.remove("active");
    document.getElementById("evento").classList.remove("active");
    document.getElementById("mudanza").classList.remove("active");

    this.navCtrl.navigate(['/lista-usuarios']);
  }
  redirectBuildings(){
    
  }
  miMudanza(){
    document.getElementById("mudanza").classList.add("active");
    document.getElementById("usuarios").classList.remove("active");
    document.getElementById("home").classList.remove("active");
    document.getElementById("evento").classList.remove("active");
    this.navCtrl.navigate(['/codigo-mudanza']);
  }

}
