import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { inputs } from '../../constants/inputs';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {


  
  frmResetPass: FormGroup;
  constructor( private frmbuilder: FormBuilder, 
    private fb: FirebaseService,
    private navctrl: Router, 
    private utils:UtilsService) { }

  ngOnInit() {
    this.initializeFormResetPass();
  }

  initializeFormResetPass(){
    this.frmResetPass = this.frmbuilder.group({
      email: ['', [Validators.required,Validators.email, Validators.pattern(inputs.EMAIL)]],
    });
  }

    resetPass(){
     
      if(!this.frmResetPass.valid){
          this.utils.showToast("Ingrese un correo", 3000).then(data => data.present())
      }else{
          this.fb.resetPassword(this.frmResetPass.value.email);
          this.navctrl.navigate(['/login'])
      }
    }

  }







