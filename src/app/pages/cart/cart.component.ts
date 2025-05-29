import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userEmail: string = localStorage.getItem('userEmail') || '';
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (this.userEmail) {
      this.cartService.getCart(this.userEmail).subscribe({
        next: (data) => {
          this.cartItems = data;
          this.calculateTotal();
        },
        error: (err) => console.error('Erreur chargement panier', err)
      });
    }
  }

  removeFromCart(gameId: number): void {
    if (!this.userEmail) return;

    this.cartService.removeFromCart(this.userEmail, gameId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== gameId);
        this.calculateTotal();
      },
      error: (err) => console.error('Erreur suppression article', err)
    });
  }

  calculateTotal(): void {
  this.totalPrice = this.cartItems.reduce(
    (total, item) => total + parseFloat(item.price), 0
  );
}

}
