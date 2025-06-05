import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string = localStorage.getItem('userId') || '';
  totalPrice: number = 0;

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.cartService.getCart(this.userId).subscribe({
        next: (data) => {
          this.cartItems = data;
          this.calculateTotal();
        },
        error: (err) => console.error('Erreur chargement panier', err)
      });
    }
  }

  removeFromCart(gameId: number): void {
    if (!this.userId) return;

    this.cartService.removeFromCart(this.userId, gameId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== gameId);
        this.calculateTotal();
      },
      error: (err) => console.error('Erreur suppression article', err)
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity, 0
    );
  }

  validateOrder(): void {
  if (!this.userId) return;

  this.orderService.addOrder(this.userId).subscribe({
    next: (res) => {
      alert('Commande validée avec succès !');
      this.cartItems = [];
      this.totalPrice = 0;
    },
    error: (err) => {
      console.error('Erreur validation commande', err);
      alert('Erreur lors de la validation de la commande.');
    }
  });
}

}
