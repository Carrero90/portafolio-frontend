import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean;
  error: string;


  constructor(private loginService: LoginService, private router: Router) {
    this.error = "";
    this.isLogin = true;
  }

  ngOnInit(): void {
  }
  onSwitch() {
    this.isLogin = !this.isLogin;
  }





  onSubmit(logintForm: NgForm) {
    if (!logintForm.valid) {
      return;
    }
    //obtener los datos del formulario
    const email = logintForm.value.email;
    const password = logintForm.value.password;
     

    //condicion si esta en registro o en iniciar sesion
    if (this.isLogin) {
      this.loginService.loginIn(email, password).subscribe(res => {
        //console.log(res);
        this.router.navigate(['/persona']);

      }, erroMens => {
        //console.log(erroMens);
        this.error = erroMens;
        
      });
    } else {
      //llamado de la api
      this.loginService.loginUp(email, password).subscribe(res => {
        //console.log(res);

      }, erroMens => {
        //console.log(erroMens);
        this.error = erroMens;
      });

      
    }

    logintForm.reset();

    

  }

}
