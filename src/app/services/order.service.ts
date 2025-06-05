import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  addOrder(userId: string): Observable<any> {
    return this.http.post(this.apiUrl, { user_id: userId });
  }

  getOrdersByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  getOrderDetails(orderId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/details/${orderId}`);
}



}
