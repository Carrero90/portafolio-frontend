import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { Login } from '../models/login';

//creacion de interface como respuesta de datos
export interface LoginResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login = new BehaviorSubject<Login>(null);
  private tokenExpirationTime: any;


  constructor(private httpClient: HttpClient, private router: Router) { }


  //metodo de registro
  loginUp(email: string, password: string) {
    return this.httpClient.post<LoginResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_8DAgR-51rd6ClKXu-ew0aYPr4ONKxxM',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.hadleError), tap(resData => {
      this.handleAut(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  //metodo para iniciar sesion

  loginIn(email: string, password: string) {
    return this.httpClient.post<LoginResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_8DAgR-51rd6ClKXu-ew0aYPr4ONKxxM',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.hadleError), tap(resData => {
      this.handleAut(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  //metodo que hace configurar automaticamente el inicio de sesion del usuario cuando se inicie la aplicacion y lo hara en el almacenamiento y comprobara si hay una instantanea de usuario existente almacenada

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new Login(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.login.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 
      this.autoLogOut(expirationDuration);
    }
  }
  //metodo para salir de sesion
  logout() {
    this.login.next(null);
    this.router.navigate(['/login']);
    //para borrar los datos del usuario
    localStorage.removeItem('userData');
    if(this.tokenExpirationTime){
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }

  //cierre de sesion automatico
  autoLogOut(expirationDuration: number){
    //console.log(expirationDuration);
    
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAut(email: string, userId: string, token: string, expiresIn: number) {
    //crear objeto de fecha ya que no se esncuentra dentro de la interface como propiedad
    const expeDate = new Date(new Date().getTime() + expiresIn * 1000);
    //crear nuevo usuario
    const user = new Login(email, userId, token, expeDate);
    this.login.next(user);
    this.autoLogOut(expiresIn * 1000);
    //para almacenar los datos en el storage
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private hadleError(errorRe: HttpErrorResponse) {
    let erroMens = 'No se puede identificar el error';
    if (!errorRe.error || !errorRe.error.error) {
      return throwError(erroMens);
    }
    //para verificar el error y el tipo de error que sea mas especifico
    switch (errorRe.error.error.message) {
      case 'EMAIL_EXISTS':
        erroMens = 'El correo ya existe';
        break;
      case 'EMAIL_NOT_FOUND':
        erroMens = 'El correo no se encuentra';
        break;
      case 'INVALID_PASSWORD':
        erroMens = 'Contraseña invalida';
    }
    return throwError(erroMens);
  }

}

