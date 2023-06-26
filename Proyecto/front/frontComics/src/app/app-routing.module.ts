import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsComponent } from './pages/comics/comics.component';
import { AddComicComponent } from './pages/add-comic/add-comic.component';
import { ModifyComicComponent } from './pages/modify-comic/modify-comic.component';
import { ComicDetailComponent } from './pages/comic-detail/comic-detail.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  {path: "comic", component: ComicsComponent},
  {path: "add", component: AddComicComponent},
  {path: "edit", component: ModifyComicComponent},
  {path: "comic/:id", component: ComicDetailComponent},
  {path: "home", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
