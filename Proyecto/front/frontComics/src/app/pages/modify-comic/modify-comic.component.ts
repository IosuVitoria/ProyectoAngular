import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-comic',
  templateUrl: './modify-comic.component.html',
  styleUrls: ['./modify-comic.component.css']
})
export class ModifyComicComponent implements OnInit {
  comic: any;
  modifiedComicForm: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.modifiedComicForm = new FormGroup({
      title: new FormControl(),
      author: new FormControl(),
      cover: new FormControl(),
      company: new FormControl(),
      description: new FormControl(),
      year: new FormControl(),
      price: new FormControl()
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const comicId = params['id'];
      if (comicId) {
        this.getComicsById(comicId).subscribe((comic: any) => {
          this.comic = comic;
          this.populateForm();
        });
      }
    });
  }

  getComicsById(id: number) {
    return this.http.get(`http://localhost:3000/comics/${id}`);
  }

  populateForm() {
    if (this.comic) {
      this.modifiedComicForm.patchValue({
        title: this.comic.title,
        author: this.comic.author,
        cover: this.comic.cover,
        company: this.comic.company,
        description: this.comic.description,
        year: this.comic.year,
        price: this.comic.price
      });
    }
  }

  submitForm() {
    const modifiedComic = this.modifiedComicForm.value;
    this.updateComic(modifiedComic).subscribe(() => {
      console.log('Comic actualizado correctamente');
      this.router.navigate(['/comic']);
    });
  }

  updateComic(modifiedComic: any) {
    return this.http.put(`http://localhost:3000/comics/${this.comic.id}`, modifiedComic);
  }
}
