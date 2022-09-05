import { FormControl, ValidationErrors } from "@angular/forms";

export class AboutEditValidators {

    //validacion de espacios 

    static notEspacios(control: FormControl): ValidationErrors {
        
        // verificar si la cadena solo tiene espacios en blanco
        if((control.value != null) && (control.value.trim().length === 0)){

            //validacion aqui deberia fallar, se retorna un objeto de error
            return {'notEspacios' : true};

        } else {
            //validacion aqui deberia pasar, se retorna nulo
            return Boolean;
        }

        
    }
}
