import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { roles } from '../../constants/roles';
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
    patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    constructor(
        private frservice: FirebaseService,
        private frmbuilder: FormBuilder,
        private navCtrl: Router,
        private utils: UtilsService,
        private loadCtrl: LoadingController) { }

    ngOnInit() {
        this.initializeFormAuth();
    }

    initializeFormAuth() {
        this.frmAuth = this.frmbuilder.group({
            user: ['', [Validators.required, Validators.email, Validators.pattern(this.patternEmail)]],
            password: ['', [Validators.required]]
        });
    }

    ionViewWillEnter() {
        const user = JSON.parse(localStorage.getItem('IDUSER'));

        if (user) {
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

        if (!this.frmAuth.valid)
            this.utils.showToast("Usuario/contraseña son incorrectos", 3000).then(toasData => toasData.present());
        else {
            let loader = this.loadCtrl.create({
                message: "Por favor espere..."
            });

            (await loader).present();

            const userlogin = await this.frservice.obtenerLoginPromise(this.frmAuth.value);
            localStorage.setItem("IDUSER", JSON.stringify(userlogin[0]));

            if (userlogin.length > 0) {

                if (userlogin[0].estado == 1) {

                    if (userlogin[0].tipo == "residente")
                        this.navCtrl.navigate(['/home']);
                    else
                        this.navCtrl.navigate(['/admin']);
                } else
                    this.navCtrl.navigate(['/cuenta-desabilitada']);
            }

            (await loader).dismiss();
        }
    }
}


