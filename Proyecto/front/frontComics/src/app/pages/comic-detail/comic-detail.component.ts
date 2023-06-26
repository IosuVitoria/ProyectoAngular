import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/shared/services/comic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicI } from 'src/interfaces/model';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {
  id!: number;
  comic!: ComicI;
  rating: number = 0;

  constructor(private comicApi: ComicService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });

    this.comicApi.getComicsById(this.id).subscribe((data: any) => {
      this.comic = data;
    });
  }

  deleteComic(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cómic?')) {
      this.comicApi.deleteComic(id).subscribe(() => {
        console.log('Comic eliminado correctamente');
        this.router.navigate(['/comic']); // Navegar a la pantalla de comics
      });
    }
  }
}
