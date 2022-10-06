import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Hard } from 'src/app/models/hard';
import { HardService } from 'src/app/services/hard.service';
import { AboutEditValidators } from 'src/app/validators/about-edit-validators';

@Component({
  selector: 'app-hard-edit',
  templateUrl: './hard-edit.component.html',
  styleUrls: ['./hard-edit.component.css']
})
export class HardEditComponent implements OnInit {
  hardFormGroup: FormGroup;
  hard: Hard[];
  id: number;
  editMode: boolean;


  constructor(private hardService: HardService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {

    this.hardFormGroup = this.formBuilder.group({});
    this.hard = [];
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
      this.hardService.getIdHard(this.id).subscribe(response => {
        this.nombreHabi?.setValue(response.nombreHabi)
        this.porcentaje?.setValue(response.porcentaje)
      });

    }
    //de lo contrario, es decir si es nuevo id= 0
    //formulario y su respectiva validacion
    this.hardFormGroup = this.formBuilder.group({
      hard: this.formBuilder.group({
        nombreHabi: new FormControl('', [Validators.required, Validators.minLength(2), AboutEditValidators.notEspacios]),
        porcentaje: new FormControl('', [Validators.required])
      })
    });
  }


  //evento para enviar la informacion al back-end
  onSubmit() {
    //guardar nueva habilidad
    let hard = new Hard(0, "", 0);

    //para que guarde los valores que se intriduce en el formulario
    hard = this.hardFormGroup.controls['hard'].value;

    if (this.editMode) {
      this.hardService.updateHard(this.id, hard).subscribe({

        next: response => {

          alert("Se ha actualizado con éxito");

          //para que vuelba a la pagina de habilidades
          this.router.navigateByUrl("/hard");
        },
        error: err => {
          alert('Error al guardar');
        }

      });
    } else {
      //valida de que todos los campos sean obligatorios
      if (this.hardFormGroup.invalid) {
        this.hardFormGroup.markAllAsTouched();
        return;
      }

      //llamado de la api rest
      this.hardService.saveHard(hard).subscribe({

        //para obtener los resultados de la api
        next: response => {
          alert('La habilidad se ha guardado con éxito');

          //para resetear el formulario
          this.hardFormGroup.reset();

          //para que vuelva a la pagina de habilidades
          this.router.navigateByUrl("/hard");
        },

        //manejo de errores
        error: err => {
          alert('Error al guardar');
        }
      });
    }


  }

  //definir los metodos getter para el obtener el acceso de los controles del formulario que será utilizado en la plantilla y comprobar el estado del control del formulario

  get nombreHabi() { return this.hardFormGroup.get('hard.nombreHabi') };
  get porcentaje() { return this.hardFormGroup.get('hard.porcentaje') };

}



