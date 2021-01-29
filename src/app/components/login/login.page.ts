import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { roles } from 'src/app/constants/roles';
import { inputs } from '../../constants/inputs';
import { states } from '../../constants/states';
import { Usermodel } from '../../models/usuarios.model';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    check: boolean = false;
    user = {} as Usermodel;
    frmAuth: FormGroup;

    constructor(
        private frservice: FirebaseService,
        private frmbuilder: FormBuilder,
        private navCtrl: Router,
        private utils: UtilsService,
        private loadCtrl: LoadingController,
        public afAuth: AngularFireAuth) { }

    ngOnInit() {    
        this.initializeFormAuth();
    }

    initializeFormAuth() {
        this.frmAuth = this.frmbuilder.group({
            user: ['fernandomonterroza48@gmail.com', [Validators.required, Validators.email, Validators.pattern(inputs.EMAIL)]],
            password: ['123456', [Validators.required]],
            check: false
        });
    }

    ionViewWillEnter() {
        const user = JSON.parse(localStorage.getItem('IDUSER'));

        if (user && user != null) {
            if (user.estado === states.ACTIVE) {
                if (user.tipo === roles.ADMIN)
                    this.navCtrl.navigate(['/admin']);
                else
                    this.navCtrl.navigate(['/home']);
            }
            else
                this.navCtrl.navigate(['/cuenta-desabilitada']);
        }
    }

    async login() {
        if (!this.frmAuth.valid) {
            if (this.frmAuth.value.user === "") {
                this.utils.showToast("Por favor ingrese su correo", 3000).then(toasData => toasData.present());
            }
            if (this.frmAuth.value.password === "") {
                this.utils.showToast("Por favor ingrese su contraseña", 3000).then(toasData => toasData.present());
            }
        }
        else {
            const user = await this.frservice.login(this.frmAuth.value.user, this.frmAuth.value.password);

            let loader = this.loadCtrl.create({
                message: "Por favor espere..."
            });
            (await loader).present();

            if (user != null) {
                if (user.emailVerified != false) {
                    const userlogin = await this.frservice.obtenerLoginPromise(this.frmAuth.value);

                    localStorage.setItem("IDUSER", JSON.stringify(userlogin[0]));

                    if (userlogin.length > 0) {
                        if (userlogin[0].estado === states.ACTIVE) {
                           
                            if (userlogin[0].tipo == roles.RESIDENTE)
                               return false;// this.navCtrl.navigate(['/home']);
                            else
                                this.navCtrl.navigate(['/admin']);

                        } else
                            this.navCtrl.navigate(['/cuenta-desabilitada']);
                    }
                } else {
                    this.utils.showToast("Cuenta no ha sido verificada", 3000).then(toasData => toasData.present());
                }
            } else {

                this.utils.showToast("Usuario/contraseña son incorrectos", 3000).then(toasData => toasData.present());
            }
              
                if(this.frmAuth.value.check != false){
                    localStorage.setItem("USER2", JSON.stringify(user));
                }
           
                    
            
            (await loader).dismiss();
        }
        this.resetFormAuth();
    }

    resetFormAuth() {
        this.frmAuth.reset();
    }

}
