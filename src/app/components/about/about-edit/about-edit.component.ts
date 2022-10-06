import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { FileImagen } from 'src/app/models/file-imagen';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { UploadService } from 'src/app/services/upload.service';




@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css'],

})
export class AboutEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  persona = new Persona(0, "", "", "", "", []);
  fileName: any;





  constructor(private sanitizer: DomSanitizer,
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute,
    private uploade: UploadService) {

    this.id = 0;
    this.editMode = false;
    this.fileName = '';




  }


  ngOnInit(): void {

    //para obtener el id por la ruta
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

    });
    if (this.editMode) {
      this.getPersonaId();
    }
  }

  //obtener persona por id
  getPersonaId() {
    this.personaService.getIdPersona(this.id)
      .pipe(
        map(p => this.uploade.createImagenes(p))
      )
      .subscribe(
        (respon) => {
          this.persona = respon;
        });
  }


  //evento para enviar el formulario al back-end
  onSubmit(personaForm: NgForm) {

    const personaFormData = this.prepareFormData(this.persona);
    if (this.editMode) {
      this.personaService.updatePersona(this.id, personaFormData)
        .subscribe({

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


      //llamando a la api rest para guardar
      this.personaService.savePersona(personaFormData).subscribe(
        {

          //para obtener los resultados de la api
          next: response => {
            alert('El perfil se ha guardado con éxito');


            //para resetear el  formulario
            personaForm.reset();
            this.persona.personaImagen = [];

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

  //para capturar la imagen

  onselectFile(event: any) {
    if (event.target.files) {

      const file = event.target.files[0];
      this.fileName = file.name;
      const fileImagen: FileImagen = {
        id: file.id,
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.persona.personaImagen.push(fileImagen);
    }
  }

  //para agregar la imagen a la base de datos
  prepareFormData(persona: Persona): FormData {
    const formData: FormData = new FormData();

    formData.append(
      'thePersona',
      new Blob([JSON.stringify(persona)], { type: 'application/json' })
    );
    for (var i = 0; i < persona.personaImagen.length; i++) {
      formData.append(
        'imagenFile',
        persona.personaImagen[i].file,
        persona.personaImagen[i].file.name
      )
    }
    return formData;

  }

  //para remover la imagenes que se muestran
  removeImagen(i: number) {
    this.persona.personaImagen.splice(i, 1);
  }




}