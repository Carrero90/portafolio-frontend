import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/models/proyecto';
import { LoginService } from 'src/app/services/login.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy{
  proyectos: Proyecto[];
  isAuthenticated : boolean;
  private userSub: Subscription;

  constructor(private proyectoService: ProyectoService, private loginService: LoginService) {
    this.proyectos = [];
    this.isAuthenticated = false;
    this.userSub = new Subscription;
  }

  ngOnInit(): void {
    this.getProyecto();

    //para saber si estamos autenticados o no
    this.userSub = this.loginService.login.subscribe(user =>{
      this.isAuthenticated= !!user;
            
    });
  }
  getProyecto() {
    this.proyectoService.getProyecto().subscribe(
      data => {
        this.proyectos = data;
      }
    )
  };

  deletProyecto(id: number) {
    this.proyectoService.deleteProyecto(id).subscribe({
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
