import { Component, OnInit, ViewChild } from '@angular/core';
import { ComicService } from 'src/app/shared/services/comic.service';
import { ComicI } from 'src/interfaces/model';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  showCart: boolean = false;
  comicList!: ComicI[];
  cartItems: { title: string; quantity: number }[] = [];
  filteredList!: ComicI[];
  public page!:number

  @ViewChild('filterForm') filterForm!: NgForm;

  constructor(private comicApi: ComicService) {}

  ngOnInit(): void {
    this.comicApi.getComics().subscribe((data: any) => {
      this.comicList = [...data];
      this.filteredList = [...this.comicList];
    });
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

  applyFilter(filter: any): void {
    this.filteredList = this.comicList.filter((comic) => {
      const titleMatch =
        !filter.text || comic.title.toLowerCase().includes(filter.text.toLowerCase());
      const companyMatch =
        !filter.company || comic.company.toLowerCase() === filter.company.toLowerCase();
      return titleMatch && companyMatch;
    });
  }
  
}
