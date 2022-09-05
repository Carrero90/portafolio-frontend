// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UploadService {
//   private pushUrl= 'http://localhost:8080/portafolio/savepersona';
//   constructor() { }

//   //metodo que permite hacer una peticion ajax clasica pero en la cual se va a juntar un archivo para subir

//   makeFileRequest(pushUrl: string, params: Array<string>, files:Array<File>, name: string){
//     //se crea una promesa y tiene una funcion de callback
//     return new Promise(function(resolve, reject){
//       //definir la peticion ajax para subir un archivo se simula un formulario clasico
//       var formData:any = new FormData();
//       //se crea esta variable y va a contener un objeto XMLHttp asincrono
//       var xhr = new XMLHttpRequest();
//       //agrego un for para recorrer el array de archivos que me puede estar llegando y adjuntalo al formulario con el nombre que me llega de la propiedad y añade el archivo y recoge su nombre
//       for (let i = 0; i < files.length; i++) {
//         formData.append(name, files[i].name);
        
//       }
//       //escucha cuando hay un cambio
//       xhr.onreadystatechange = function (){
//         if(xhr.readyState == 4){
//           if(xhr.status == 200){
//             resolve(JSON.parse(xhr.response));
//           }else {
//             reject(xhr.response);
//           }
//         }
//       }
//       xhr.open('POST', pushUrl, true);
//       xhr.send(formData);
//     });
//   }
// }
