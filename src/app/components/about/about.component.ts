import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  


})
export class AboutComponent implements OnInit, OnDestroy {
  personas: Persona[];
  isAuthenticated : boolean;
  private userSub: Subscription;
  

  constructor(private personaService: PersonaService, private loginService: LoginService)
               {
    this.personas = [];
    this.isAuthenticated = false;
    this.userSub = new Subscription;
 

  }


  ngOnInit(): void {

    this.obtenerPersona();
    //para saber si estamos autenticados o no
    this.userSub = this.loginService.login.subscribe(user =>{
      this.isAuthenticated= !!user;
            
    });
  }
  //ontener listas de personas
  obtenerPersona() {
    this.personaService.getPersona().subscribe(
      data => {
        this.personas = data;
      }
    )
  }


  //para eliminar por id
  deletPersona(id: number) {
    this.personaService.deletePersona(id).subscribe(
      {
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

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }




}

