import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  animations: [
    trigger('panel', [

      state('open', style({
        maxHeight: 'auto',

      })),
      state('closed', style({
        height: '0px',

      })),

      transition('closed <=> open', [
        animate('0.5s ease-out')
      ]),
    ]),
  ],
})
export class EducationComponent implements OnInit, OnDestroy {
  isOpen: boolean;
  education: Education[];
  isAuthenticated : boolean;
  private userSub: Subscription;
  constructor(private educationService: EducationService, private loginService: LoginService) {
    this.education = [];
    this.isAuthenticated = false;
    this.userSub = new Subscription;
    this.isOpen = false;
  }

  ngOnInit(): void {
    this.getEducation();
    //para saber si estamos autenticados o no
    this.userSub = this.loginService.login.subscribe(user =>{
      this.isAuthenticated= !!user;
            
    });

  }

  //obtener lista de educacion
  getEducation() {
    this.educationService.getEducation().subscribe(
      data => {
        this.education = data;
      }
    )
  }

  //metodo para eliminar
  deletEducation(id: number) {
    this.educationService.deleteEducation(id).subscribe({
      //para obtener los resultados de la api
      next: response => {
        //alert('El perfil se ha eliminado con éxito');


        //para recargar la pagina de persona
        window.location.reload();
      },

      //manejo de errores
      error: err => {
        alert('Error al eliminar');
      }
    });
  }

  //metodo de animacion
  toggleOpen() {
    this.isOpen = !this.isOpen
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }




}
