import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsComponent } from './pages/comics/comics.component';
import { AddComicComponent } from './pages/add-comic/add-comic.component';
import { ModifyComicComponent } from './pages/modify-comic/modify-comic.component';
import { ComicDetailComponent } from './pages/comic-detail/comic-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TrivialMarvelComponent } from './pages/trivial/trivial.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/register/register.component';


const routes: Routes = [
  {path: "comic", component: ComicsComponent},
  {path: "add", component: AddComicComponent},
  { path: 'edit/:id', component: ModifyComicComponent },
  {path: "comic/:id", component: ComicDetailComponent},
  {path: "home", component: HomeComponent},
  {path: "contact", component: ContactComponent},
  {path: "trivial", component: TrivialMarvelComponent},
  {path: "login", component:LoginComponent},
  {path: "register", component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
