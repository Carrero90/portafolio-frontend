import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { AboutEditValidators } from 'src/app/validators/about-edit-validators';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {

  experienceFormGroup: FormGroup;
  experience: Experience[];
  id: number;
  editMode: boolean;
  fecha: string;
 

  constructor(private experienciaService: ExperienceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {

    this.experienceFormGroup = this.formBuilder.group({});
    this.experience = [];
    this.id = 0;
    this.editMode = false;
    this.fecha = "Actual";
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
      this.experienciaService.getIdExperience(this.id).subscribe(response => {
        this.nombreEmpresa?.setValue(response.nombreEmpresa)
        this.fechaInicio?.setValue(response.fechaInicio)
        this.fechaFin?.setValue(response.fechaFin)
        this.descLaboral?.setValue(response.descLaboral)

      });

    }
    //de lo contrario, es decir si es nuevo id= 0
    //formulario y su respectiva validacion
    this.experienceFormGroup = this.formBuilder.group({
      experience: this.formBuilder.group({
        nombreEmpresa: new FormControl('', [Validators.required, Validators.minLength(2), AboutEditValidators.notEspacios]),
        fechaInicio: new FormControl('', [Validators.required, Validators.minLength(8), AboutEditValidators.notEspacios]),
        fechaFin: new FormControl('', [Validators.required, Validators.minLength(8), AboutEditValidators.notEspacios]),
        descLaboral: new FormControl('', [Validators.required, Validators.minLength(8), AboutEditValidators.notEspacios]),

      })
    });
  }

  //evento para enviar la informacion al backend
  onSubmit() {
    //guardar nueva experience
    let experience = new Experience(0, "", "", "", "");

    //para que guarde los valores que se introduce en el formulario
    experience = this.experienceFormGroup.controls['experience'].value;

    if (this.editMode) {
      this.experienciaService.updateExperience(this.id, experience).subscribe({

        next: response => {

          alert("Se ha actualizado con éxito");

          //para que vuelba a la pagina de experiencia
          this.router.navigateByUrl("/experience");
        },
        error: err => {
          alert('Error al guardar');
        }

      });
    } else {
      //valida de que todos los campos sean obligatorios
      if (this.experienceFormGroup.invalid) {
        this.experienceFormGroup.markAllAsTouched();
        return;
      }

      //llamado de la api
      this.experienciaService.saveExperience(experience).subscribe({


        //para obtener los resultados de la api
        next: response => {
          alert('La experiencia se ha guardado con éxito');

          //para resetear el formulario
          this.experienceFormGroup.reset();

          //para que vuelva a la pagina de experiencia
          this.router.navigateByUrl("/experience");

        },
        //manejo de errores
        error: err => {
          alert('Error al guardar');
        }

      });
    }


  }

  //definir los metodos getter para el obtener el acceso de los controles del formulario que será utilizado en la plantilla y comprobar el estado del control del formulario

  get nombreEmpresa() { return this.experienceFormGroup.get('experience.nombreEmpresa'); }
  get fechaInicio() { return this.experienceFormGroup.get('experience.fechaInicio'); }
  get fechaFin() { return this.experienceFormGroup.get('experience.fechaFin'); }
  get descLaboral() { return this.experienceFormGroup.get('experience.descLaboral'); }

 


}
