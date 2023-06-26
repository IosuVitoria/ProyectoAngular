import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComicI } from 'src/interfaces/model';
import { Router } from '@angular/router';
import { ComicService } from 'src/app/shared/services/comic.service';

@Component({
  selector: 'app-add-comic',
  templateUrl: './add-comic.component.html',
  styleUrls: ['./add-comic.component.css']
})
export class AddComicComponent implements OnInit {
  comicForm!: FormGroup;
  comic!: ComicI;
  submitted: boolean = false;

  constructor(private form: FormBuilder, private comicApi: ComicService, private router: Router) {}

  ngOnInit(): void {
    this.comicForm = this.form.group({
      title: ["", [Validators.required, Validators.minLength(4)]],
      cover: ["", [Validators.required]],
      author: ["", [Validators.required]],
      company: ["", [Validators.required]],
      description: [""],
      year: ["", [Validators.required, Validators.min(1930), Validators.max(2100)]]
    });

    this.comicForm.valueChanges.subscribe((data) => {
      this.comic = data;
    });
  }

  //Cuando se pasa al estado true de enviado se activa la recogida de datos del formulario.
  //Si los datos pasan los validadores, se usa del servicio la metodología post para guardar los datos.
  //Al darle a añadir además se reseteará el formulario y se pasará la variable de estado enviado a false.

  addComic(): void {
    this.submitted = true;
    if (this.comicForm.valid) {
      this.comicApi.postComic(this.comic).subscribe((data) => {
        console.log(data);
        this.comicForm.reset();
        this.submitted = false;
        this.router.navigate(["/"]);
      });
    }
  }

 
}
