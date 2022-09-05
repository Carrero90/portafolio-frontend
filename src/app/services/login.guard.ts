import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { LoginService } from "./login.service";

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate{
    constructor(private loginService: LoginService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean |  UrlTree  | Observable<boolean  | UrlTree> | Promise<boolean> {
        this.loginService.login.pipe(take(1), map(login => {
            const isLogin = !!login;
            if(isLogin){
                return true;
            }
            return this.router.createUrlTree(['/login']);
        }));
        return this.router.navigate(['/login']);
    }

}