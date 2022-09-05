import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { AboutEditValidators } from 'src/app/validators/about-edit-validators';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {
  educationFormGroup: FormGroup;
  education: Education[];
  id: number;
  editMode: boolean;

  constructor(private formBuilder: FormBuilder,
    private educationSevice: EducationService,
    private router: Router,
    private route: ActivatedRoute) {
    this.educationFormGroup = this.formBuilder.group({});
    this.education = [];
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
      this.educationSevice.getIdEducation(this.id).subscribe(response => {
        this.nombreUniversidad?.setValue(response.nombreUniversidad)
        this.yearIngreso?.setValue(response.yearIngreso)
        this.yearEgreso?.setValue(response.yearEgreso)
        this.carrera?.setValue(response.carrera)
        this.descripcion?.setValue(response.descripcion)
      });

    }
    //de lo contrario, es decir si es nuevo id= 0
    //formulario y su respectiva validación
    this.educationFormGroup = this.formBuilder.group({
      education: this.formBuilder.group({
        nombreUniversidad: new FormControl('', [Validators.required, Validators.minLength(2), AboutEditValidators.notEspacios]),
        yearIngreso: new FormControl('', [Validators.required, Validators.minLength(8), AboutEditValidators.notEspacios]),
        yearEgreso: new FormControl('', [Validators.required, Validators.minLength(8), AboutEditValidators.notEspacios]),
        carrera: new FormControl('', [Validators.required, Validators.minLength(8), AboutEditValidators.notEspacios]),
        descripcion: new FormControl('', [Validators.required, Validators.minLength(8), AboutEditValidators.notEspacios]),

      })
    });
  }

  //evento para enviar la informacion al back-end
  onSubmit() {
    //guardar nueva education
    let education = new Education(0,"", "", "", "", "");

    //para que guarde los valores que se intriduce en el formulario
    education = this.educationFormGroup.controls['education'].value;

    if (this.editMode){
      this.educationSevice.updateEducation(this.id, education).subscribe({

        next: response => {

          alert("Se ha actualizado con éxito");

          //para que vuelba a la pagina de inicio
          this.router.navigateByUrl("/education");
        },
        error: err => {
          alert('Error al guardar');
        }


      });
    }else {
      //valida de que todos los campos sean obligatorios
      if (this.educationFormGroup.invalid) {
        this.educationFormGroup.markAllAsTouched();
        return;
      }

      //llamado de la api rest
    this.educationSevice.saveEducation(education).subscribe({

      //para obtener los resultados de la api
      next: response => {
        alert('La educación se ha guardado con éxito');

        //para resetear el formulario
        this.educationFormGroup.reset();

        //para que vuelva a la pagina de educacion
        this.router.navigateByUrl("/education");
      },

      //manejo de errores
      error: err => {
        alert('Error al guardar');
      }
    });
    }
      
    
  }



  //definir los metodos getter para el obtener el acceso de los controles del formulario que será utilizado en la plantilla y comprobar el estado del control del formulario

  get nombreUniversidad() { return this.educationFormGroup.get('education.nombreUniversidad'); }
  get yearIngreso() { return this.educationFormGroup.get('education.yearIngreso'); }
  get yearEgreso() { return this.educationFormGroup.get('education.yearEgreso'); }
  get carrera() { return this.educationFormGroup.get('education.carrera'); }
  get descripcion() { return this.educationFormGroup.get('education.descripcion'); }

}
