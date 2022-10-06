import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { FileImagen } from 'src/app/models/file-imagen';
import { Proyecto } from 'src/app/models/proyecto';
import { FileService } from 'src/app/services/file.service';
import { ProyectoService } from 'src/app/services/proyecto.service';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  proyecto = new Proyecto(0, "", "", "", []);
  fileName: any;

  constructor(private proyectoService: ProyectoService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fileService: FileService) {


    this.id = 0;
    this.editMode = false;
    this.fileName = "";

  }

  ngOnInit(): void {

    //para obtener el id por la ruta
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

    });
    if (this.editMode) {
      this.getProyectoId();
    }


  }

  //obtener persona por id
  getProyectoId() {
    this.proyectoService.getIdProyecto(this.id)
      .pipe(
        map(p => this.fileService.crearImagen(p))
      )
      .subscribe(
        (respon) => {
          this.proyecto = respon;
        });
  }



  //evento para enviar el formulario al back-end
  onSubmit(proyectoForm: NgForm) {
    const proyectoFormData = this.preparFormData(this.proyecto);

    if (this.editMode) {
      this.proyectoService.updateProyecto(this.id, proyectoFormData).subscribe({

        next: response => {

          alert("Se ha actualizado con éxito");

          //para que vuelva a la pagina de inicio
          this.router.navigateByUrl("/project");
        },
        error: err => {
          alert('Error al guardar');
        }

      });
    } else {


      //llamando a la api rest
      this.proyectoService.saveProyecto(proyectoFormData).subscribe(
        {
          //para obtener los resultados de la api
          next: response => {
            alert('El perfil se ha guardado con éxito');

            //para resetear el  formulario
            proyectoForm.reset();

            //para que vuelva a la pagina de inicio
            this.router.navigateByUrl("/project");
          },

          //manejo de errores
          error: err => {
            alert('Error al guardar');
          }
        }
      )
    }



  }

  //para guardar el archivo

  preparFormData(proyecto: Proyecto): FormData {
    const formData = new FormData();

    formData.append(
      'theProyec',
      new Blob([JSON.stringify(proyecto)], { type: 'application/json' })
    );

    for (let i = 0; i < proyecto.proyectoImagen.length; i++) {
      formData.append(
        'imageFile',
        proyecto.proyectoImagen[i].file,
        proyecto.proyectoImagen[i].file.name
      )
    }
    return formData;
  }



  //para seleccionar el archivo

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.fileName = file.name;
      const fileImagen: FileImagen = {
        id: file.id,
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.proyecto.proyectoImagen.push(fileImagen);
    }


  }

  //para remover la imagen de la vista
  removeFile(i: number) {
    this.proyecto.proyectoImagen.splice(i, 1);
  }

}
