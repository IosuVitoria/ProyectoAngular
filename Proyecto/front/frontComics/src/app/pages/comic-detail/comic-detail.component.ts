import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/shared/services/comic.service';
import { ActivatedRoute } from '@angular/router';
import { ComicI } from 'src/interfaces/model';


@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit{
  id! : number;
  comic!: ComicI;
  rating: number = 0;

  //El constructor contiene la llamada a la API y el activatedRoutes para poder sacar la información.

  constructor(private comicApi: ComicService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=> {
      this.id = Number(params.get('id'));
    })
    this.comicApi.getComicsById(this.id).subscribe((data: any) => {
      this.comic = data;
    })
  }
  

}
