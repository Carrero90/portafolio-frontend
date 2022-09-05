import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hard } from 'src/app/models/hard';
import { HardService } from 'src/app/services/hard.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.css']
})
export class HardComponent implements OnInit,  OnDestroy{
  hard: Hard[];
  isAuthenticated : boolean;
  private userSub: Subscription;

  constructor(private hardService: HardService, private loginService: LoginService) {
             
    this.hard = [];
    this.isAuthenticated = false;
    this.userSub = new Subscription;
  }

  ngOnInit(): void {
    //obtener datos del backend
    this.obtenerHard();

    //para saber si estamos autenticados o no
    this.userSub = this.loginService.login.subscribe(user =>{
      this.isAuthenticated= !!user;
            
    });

  }
  //obtener datos del backend
  obtenerHard() {
    this.hardService.getHard().subscribe(
      data => {
        this.hard = data;
      }
    )
  };

  deletHard(id:number){
    this.hardService.deleteHard(id).subscribe({
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
