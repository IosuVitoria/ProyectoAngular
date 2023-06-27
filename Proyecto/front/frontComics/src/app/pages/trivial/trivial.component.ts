import { Component, OnInit } from '@angular/core';

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
export class TrivialMarvelComponent implements OnInit {
  preguntas: Question[] = [];
  puntos: number = 0;

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas(): void {
    fetch('./preguntas.json')
      .then(response => response.json())
      .then(data => {
        this.preguntas = data.preguntas;
        this.preguntas = this.seleccionarPreguntasAleatorias(20);
      })
      .catch(error => {
        console.error('Error al cargar las preguntas:', error);
      });
  }

  seleccionarPreguntasAleatorias(cantidad: number): Question[] {
    const preguntasAleatorias: Question[] = [];
    const totalPreguntas = this.preguntas.length;

    for (let i = 0; i < cantidad; i++) {
      const randomIndex = Math.floor(Math.random() * totalPreguntas);
      preguntasAleatorias.push(this.preguntas[randomIndex]);
    }

    return preguntasAleatorias;
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
