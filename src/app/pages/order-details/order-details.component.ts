import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId: number = 0;
  items: any[] = [];
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
  this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
  console.log('[OrderDetails] orderId reçu =', this.orderId);

  if (this.orderId) {
    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (data) => {
        console.log('[OrderDetails] Données reçues :', data); 
        this.items = data;
        this.totalPrice = data.reduce((total: number, item: any) =>
          total + item.price * item.quantity, 0);
      },
      error: (err) => console.error('[OrderDetails] Erreur :', err)
    });
  }
}

}
