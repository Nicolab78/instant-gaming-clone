import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userId: string = localStorage.getItem('userId') || '';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    if (this.userId) {
      this.orderService.getOrdersByUser(this.userId).subscribe({
        next: (data) => this.orders = data,
        error: (err) => console.error('Erreur chargement commandes', err)
      });
    }
  }

  viewOrderDetails(orderId: number): void {
    console.log('[OrdersComponent] Navigation vers détails commande ID =', orderId);
    this.router.navigate(['/order-details', orderId]);
  }
}
