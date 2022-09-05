import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { AboutEditValidators } from 'src/app/validators/about-edit-validators';



@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css'],

})
export class AboutEditComponent implements OnInit {
  aboutFormGroup: FormGroup;
  about: Persona[];
  id: number;
  editMode: boolean;
  



  constructor(private formBuilder: FormBuilder,
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute) {
    this.aboutFormGroup = this.formBuilder.group({});
    this.about = [];
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
      this.personaService.getIdPersona(this.id).subscribe(response => {
        this.nombre?.setValue(response.nombre)
        this.apellido?.setValue(response.apellido)
        this.ocupacion?.setValue(response.ocupacion)
        this.sobreMi?.setValue(response.sobreMi)
      });

    }
    //de lo contrario, es decir si es nuevo id= 0
    //formulario y su respectiva validación
    this.aboutFormGroup = this.formBuilder.group({
      about: this.formBuilder.group({
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), AboutEditValidators.notEspacios]),
        apellido: new FormControl('', [Validators.required, Validators.minLength(2), AboutEditValidators.notEspacios]),
        ocupacion: new FormControl('', [Validators.required, Validators.minLength(2), AboutEditValidators.notEspacios]),
        sobreMi: new FormControl('', [Validators.required, Validators.minLength(5), AboutEditValidators.notEspacios]),
        urlFoto: new FormControl('', [Validators.required])
      })

    });
  }


  //evento para enviar el formulario al back-end
  onSubmit() {
     //guardar nueva persona
     let persona = new Persona(0, "", "", "", "","");

     //para que guarde los valores que se intriduce en el formulario
     persona = this.aboutFormGroup.controls['about'].value;

    if (this.editMode) {
      this.personaService.updatePersona(this.id, persona).subscribe({

        next: response => {

          alert("Se ha actualizado con éxito")

          //para que vuelba a la pagina de inicio
          this.router.navigateByUrl("/personas");
        },
        error: err => {
          alert('Error al guardar');
        }


      });
    } else {
      //valida de que todos los campos sean obligatorios
      if (this.aboutFormGroup.invalid) {
        this.aboutFormGroup.markAllAsTouched();
        return;
      }
     

      //llamando a la api rest
      this.personaService.savePersona(persona).subscribe(
        {

          //para obtener los resultados de la api
          next: response => {
            alert('El perfil se ha guardado con éxito');


            //para resetear el  formulario
            this.aboutFormGroup.reset();

            //para que vuelba a la pagina de inicio
            this.router.navigateByUrl("/personas");
          },

          //manejo de errores
          error: err => {
            alert('Error al guardar');
          }

        });
    }
   

  }





  //definir los metodos getter para el obtener el acceso de los controles del formulario que será utilizado en la plantilla y comprobar el estado del control del formulario

  get nombre() { return this.aboutFormGroup.get('about.nombre'); }
  get apellido() { return this.aboutFormGroup.get('about.apellido'); }
  get ocupacion() { return this.aboutFormGroup.get('about.ocupacion'); }
  get sobreMi() { return this.aboutFormGroup.get('about.sobreMi'); }
  get urlFoto() { return this.aboutFormGroup.get('about.urlFoto'); }


}