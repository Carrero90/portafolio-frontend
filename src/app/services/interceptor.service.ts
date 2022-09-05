import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler){
    this.loginService.login.pipe(
      take(1),
      exhaustMap(login => {
        if(!login){
          return next.handle(req) ;
        }
        const modifiReq = req.clone({ params: new HttpParams().set('login', login.token ) });
        return next.handle(modifiReq);

      })
    );
    return next.handle(req) ;
  }
  


}
