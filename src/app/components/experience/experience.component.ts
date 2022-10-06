import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experiences : Experience[];
  isAuthenticated : boolean;
  private userSub: Subscription;

  constructor( private experienceService: ExperienceService,  private loginService: LoginService) { 
    this.experiences =[];
    this.isAuthenticated = false;
    this.userSub = new Subscription;
    
  }

  ngOnInit(): void {
    this.getExperiencia();

    //para saber si estamos autenticados o no
    this.userSub = this.loginService.login.subscribe(user =>{
      this.isAuthenticated= !!user;
            
    });
  }
  getExperiencia() {
    this.experienceService.getExperiencia().subscribe(
      data => {
        this.experiences = data;
      }
    )
  }

  //metodo para eliminar
  deletExperience(id: number) {
    this.experienceService.deleteExperience(id).subscribe({
      //para obtener los resultados de la api
      next: response => {
        //alert('El perfil se ha eliminado con éxito');


        //para recargar la pagina de experiencia
        //window.location.reload();
        this.getExperiencia();
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
