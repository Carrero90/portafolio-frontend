import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    name: string = "CN";
    isAuthenticated : boolean
    private userSub: Subscription;

  constructor( private loginService: LoginService) { 
    this.isAuthenticated = false;
    this.userSub = new Subscription;
  }
 
  
  ngOnInit(): void {
    this.userSub = this.loginService.login.subscribe(user =>{
      this.isAuthenticated = !!user;
      
      
    });
  }

  //funcion para cerrar sesion
  onLogout() {
    this.loginService.logout();
    
  }

  

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
