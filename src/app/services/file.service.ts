import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileImagen } from '../models/file-imagen';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private sanitizer: DomSanitizer) { }

  public crearImagen(proyecto: Proyecto) {
    const productoImages: any[] = proyecto.proyectoImagen;

    const proyectoImagenToFileImagen: FileImagen[] = [];

    for (let i = 0; i < proyecto.proyectoImagen.length; i++) {
      const imageFileData = productoImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const finalFileImagen: FileImagen = {
        id: imageFileData.id,
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      proyectoImagenToFileImagen.push(finalFileImagen);
    }
    proyecto.proyectoImagen = proyectoImagenToFileImagen;
    return proyecto;
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
