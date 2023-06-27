import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/shared/services/comic.service';

interface Question {
  pregunta: string;
  opciones: string[];
  respuesta_correcta: string;
  selectedOptionIndex?: number;
}

@Component({
  selector: 'trivial-marvel',
  templateUrl: './trivial.component.html',
  styleUrls: ['./trivial.component.css']
})

export class TrivialMarvelComponent{
  preguntas: Question[] = [];
  puntos: number = 0;
  cantidad : number = 20; 
  preguntasAleatorias: Question[] =[];
  constructor ( private preguntApi: ComicService){}


  ngOnInit(): void {
    this.preguntApi.getPreguntas().subscribe((data: any) => {
      this.preguntas = [...data];
      console.log(this.preguntas);
    });
  }
 
  seleccionarPreguntasAleatorias(cantidad: number): Question[] {
    const preguntasAleatorias: Question[] = [];
    console.log("Aquí entro al dar botón")
    for (let i = 0; i < cantidad; i++) {
      const randomIndex = Math.floor(Math.random() * this.preguntas.length);
      console.log(this.preguntas[randomIndex])
      this.preguntasAleatorias.push(this.preguntas[randomIndex]);
    }

    return this.preguntas;
  }

  onOpcionSeleccionada(pregunta: Question, indiceOpcion: number): void {
    pregunta.selectedOptionIndex = indiceOpcion;
    if (pregunta.opciones[indiceOpcion] === pregunta.respuesta_correcta) {
      this.puntos++;
    }
  }

  calcularPuntaje(): string {
    const puntaje = (this.puntos / this.preguntas.length) * 100;
    if (puntaje >= 90) {
      return 'Eres un mutante de sabiduría omega';
    } else if (puntaje >= 80) {
      return 'Eres de nivel alfa';
    } else if (puntaje >= 70) {
      return 'Eres un beta';
    } else if (puntaje >= 60) {
      return 'Eres delta';
    } else if (puntaje >= 50) {
      return 'Eres un amigo de los mutantes';
    } else {
      return 'Debes volver al instituto Charles Xavier';
    }
  }
}
