import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/shared/services/comic.service';
import { ComicI } from 'src/interfaces/model';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})

export class ComicsComponent implements OnInit{
  faShoppingCart = faShoppingCart
  showCart:boolean = false;

  public page!: number;
  //Se importa el interface que guía el aspecto que tendrán los datos y cómo se deben tratar.
  comicList!: ComicI[];
  cartItems: { title: string, quantity: number }[] = [];
  filteredList!: ComicI[];

  //Se Se trae el servicio en concreto para ser utilizado.
  constructor(private comicApi: ComicService){}

  //Al traer el servicio se puede suscribir la petición a los cambios dentro de la api. Usando this.ComicList además llenamos esta con la información de la API.
  ngOnInit(): void{
    this.comicApi.getComics().subscribe((data: any) => {
      this.comicList = data;
    })
  }
  addToCart(comic: ComicI) {
    const cartItem = this.cartItems.find(item => item.title === comic.title);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cartItems.push({ title: comic.title, quantity: 1 });
    }
  }

  removeFromCart(comic: ComicI) {
    const cartItem = this.cartItems.find(item => item.title === comic.title);
    if (cartItem && cartItem.quantity > 0) {
      cartItem.quantity--;
    }
  }

  getCartItemQuantity(comic: ComicI): number {
    const cartItem = this.cartItems.find(item => item.title === comic.title);
    return cartItem ? cartItem.quantity : 0;
  }

  getTotalPrice(): number {
    let total = 0;
    for (const item of this.cartItems) {
      const comic = this.comicList.find(c => c.title === item.title);
      if (comic) {
        total += comic.price * item.quantity;
      }
    }
    return total;
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  applyFilter(filterValue: any) {
    this.filteredList = this.comicList.filter(item => {
      return (filterValue.brand.length==0 || item.company == filterValue.brand) 
      && (filterValue.text.length==0 || item.title.toLowerCase().includes(filterValue.text.toLowerCase()) || item.title.toLowerCase().includes(filterValue.text.toLowerCase())) 
    });
  }
}
