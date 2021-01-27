import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { inputs } from '../../constants/inputs';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {


  
  frmResetPass: FormGroup;
  constructor( private frmbuilder: FormBuilder, private fb: FirebaseService,private navctrl: Router ) { }

  ngOnInit() {
    this.initializeFormResetPass();
  }

  initializeFormResetPass(){
    this.frmResetPass = this.frmbuilder.group({
      email: ['', [Validators.required,Validators.email, Validators.pattern(inputs.EMAIL)]],
    });
  }

    resetPass(){
      console.log(this.frmResetPass.value);
      if(!this.frmResetPass.valid){
        console.log("no va")
      }else{
          this.fb.resetPassword(this.frmResetPass.value.email);
          this.navctrl.navigate(['/login'])
      }
    }

  }







