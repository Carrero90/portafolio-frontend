import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from './animations';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit{
 
 
  
  constructor( private loginService: LoginService, private contexts: ChildrenOutletContexts){
    
  }
  
  ngOnInit(): void {
    this.loginService.autoLogin();
  }

  getRouteAnimationData(){
    return this.contexts.getContext('primary').route?.snapshot?.data['animation'];
  }


 
 
}
