import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComicI } from 'src/interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private http: HttpClient) { }

  getComics(){
    return this.http.get(" http://localhost:3000/comics");
  }

  //2º Paso recibir los comics por iD y mostrarlos en pantalla. Se mostrará toda la información del mismo.

// La función getComicsBy es un método que realiza una solicitud HTTP GET a una API utilizando el servicio http de Angular. Esta función toma un parámetro 
// id de tipo number que representa el identificador del cómic que se desea obtener.

// Dentro de la función, se utiliza el método get del objeto http para realizar la solicitud GET. 
// Se utiliza una plantilla de cadena para construir la URL de la solicitud, donde se concatena el valor del parámetro id en la ruta de la API. 
// Por ejemplo, si id es igual a 1, la URL resultante será http://localhost:3000/comics/1.

// Una vez que se realiza la solicitud, el método get devuelve un objeto observable que representa la respuesta de la API. 
// El servicio que llama a esta función puede suscribirse a este observable para recibir la respuesta del servidor.

  getComicsById(id:number){
    return this.http.get(`http://localhost:3000/comics/${id}`)
  }

  postComic(comic: ComicI){
    return this.http.post(`http://localhost:3000/comics`, comic);
  }

  deleteComic(id: number){
    return this.http.delete(`http://localhost:3000/comics/${id}`);
  }
  
  getPreguntas(){
    return this.http.get(" http://localhost:3000/preguntas");
  }

}
