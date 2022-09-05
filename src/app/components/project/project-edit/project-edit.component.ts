import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { AboutEditValidators } from 'src/app/validators/about-edit-validators';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  projectFormGroup: FormGroup;
  project: Proyecto[];
  id: number;
  editMode: boolean;

  constructor(private proyectoService: ProyectoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {

    this.projectFormGroup = this.formBuilder.group({});
    this.project = [];
    this.id = 0;
    this.editMode = false;

  }

  ngOnInit(): void {

    //para obtener el id por la ruta
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

  }

  private initForm() {
    //para diferenciar si esta en modo de edicion o no
    //si esta en modo de edicion es decir id != 0
    if (this.editMode) {
      //obteneer por id
      this.proyectoService.getIdProyecto(this.id).subscribe(response => {
        this.nombreProyec?.setValue(response.nombreProyec)
        this.descProyecto?.setValue(response.descProyecto)
        this.urlPagina?.setValue(response.urlPagina)
      });

    }
    //de lo contrario, es decir si es nuevo id= 0
    //formulario y su respectiva validación
    this.projectFormGroup = this.formBuilder.group({
      project: this.formBuilder.group({
        nombreProyec: new FormControl('', [Validators.required, Validators.minLength(3), AboutEditValidators.notEspacios]),
        descProyecto: new FormControl('', [Validators.required, Validators.minLength(10), AboutEditValidators.notEspacios]),
        urlPagina: new FormControl('', [Validators.required, Validators.minLength(10), AboutEditValidators.notEspacios]),
        //urlImagen: new FormControl('', [Validators.required])
      })
    });
  }

  //evento para enviar el formulario al back-end
  onSubmit() {
    //guardar nueva persona
    let project = new Proyecto(0, "", "", "", "");

    //para que guarde los valores que se intriduce en el formulario
    project = this.projectFormGroup.controls['project'].value;

    if (this.editMode) {
      this.proyectoService.updateProyecto(this.id, project).subscribe({

        next: response => {

          alert("Se ha actualizado con éxito");

          //para que vuelba a la pagina de inicio
          this.router.navigateByUrl("/project");
        },
        error: err => {
          alert('Error al guardar');
        }

      });
    } else {
      //valida de que todos los campos sean obligatorios
      if (this.projectFormGroup.invalid) {
        this.projectFormGroup.markAllAsTouched();
        return;
      }

      //llamando a la api rest
      this.proyectoService.saveProyecto(project).subscribe(
        {
          //para obtener los resultados de la api
          next: response => {
            alert('El perfil se ha guardado con éxito');


            //para resetear el  formulario
            this.projectFormGroup.reset();
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

  //definir los metodos getter para el obtener el acceso de los controles del formulario que será utilizado en la plantilla y comprobar el estado del control del formulario

  get nombreProyec() { return this.projectFormGroup.get('project.nombreProyec'); }
  get descProyecto() { return this.projectFormGroup.get('project.descProyecto'); }
  get urlPagina() { return this.projectFormGroup.get('project.urlPagina'); }
  get urlImagen() { return this.projectFormGroup.get('project.urlImagen'); }


}
