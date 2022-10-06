import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],



})
export class AboutComponent implements OnInit, OnDestroy {
  personas: Persona[];
  isAuthenticated: boolean;
  private userSub: Subscription;


  constructor(private personaService: PersonaService,
    private loginService: LoginService,
    private uploade: UploadService) {
    this.personas = [];
    this.isAuthenticated = false;
    this.userSub = new Subscription;


  }


  ngOnInit(): void {

    this.obtenerPersona();
    //para saber si estamos autenticados o no
    this.userSub = this.loginService.login.subscribe(user => {
      this.isAuthenticated = !!user;

    });
  }
  //ontener listas de personas
  obtenerPersona() {

    this.personaService.getPersona()
      .pipe(
        map((x: Persona[], i) => x.map((persona: Persona) => this.uploade.createImagenes(persona)))
      )
      .subscribe(
        (resp) => {
          this.personas = resp;
        }
      );
  }


  //para eliminar por id
  deletPersona(id: number) {
    this.personaService.deletePersona(id).subscribe(
      {
        //para obtener los resultados de la api
        next: response => {

          //para recargar la pagina de persona
          //window.location.reload();
          this.obtenerPersona();
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

