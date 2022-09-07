import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
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
 
 
  
  constructor( private loginService: LoginService, private contexts: ChildrenOutletContexts,  @Inject(DOCUMENT) private document: any,
  private renderer: Renderer2,
  private router: Router,
  private activatedRoute: ActivatedRoute){
   
  }
  
  ngOnInit(): void {
    this.loginService.autoLogin();

    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .pipe(map(() => this.activatedRoute))
    .pipe(
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
    )
    .pipe(filter((route) => route.outlet === 'primary'))
    .pipe(mergeMap((route) => route.data))
    .subscribe((data) => this.updateBodyClass(data['bodyClass']));
  }

  private updateBodyClass(customBodyClass?: string) {
    this.renderer.setAttribute(this.document?.body, 'class', '');
    if (customBodyClass) {
      this.renderer.addClass(this.document?.body, customBodyClass);
    }
  }



  getRouteAnimationData(){
    return this.contexts.getContext('primary').route?.snapshot?.data['animation'];
  }


 
 
}
