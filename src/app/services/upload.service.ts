import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileImagen } from '../models/file-imagen';
import { Persona } from '../models/persona';


@Injectable({
    providedIn: 'root'
})
export class UploadService {
    

    constructor(private sanitizer: DomSanitizer) { }

    public createImagenes(persona: Persona) {
                
        const personaImagen: any[] = persona.personaImagen;
        
        const personaImagenesToFileImagen: FileImagen[] = [];

        for (let i = 0; i < personaImagen?.length; i++) {
            const imagenFileData = personaImagen[i];
            
            const imageBlob = this.dataURItoBlob(imagenFileData.picByte, imagenFileData.type);

            const imageFile = new File([imageBlob], imagenFileData.name, { type: imagenFileData.type });

            const finalFileImagen: FileImagen = {
                id: imagenFileData.id,
                file: imageFile,
                url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile)),
                
            };

            personaImagenesToFileImagen.push(finalFileImagen);
        }
        
        persona.personaImagen = personaImagenesToFileImagen;
        return persona;
        
        
    }

    public dataURItoBlob(picBytes: any, imageType: any) {
        const byteString = window.atob(picBytes);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);

        }

        const blob = new Blob([int8Array], { type: imageType });
        return blob;
    }

  
    
}
