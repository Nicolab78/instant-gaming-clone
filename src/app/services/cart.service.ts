import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  addToCart(game: any, userId: string): Observable<any> {
    const body = {
      user_id: userId,
      game_id: game.id
    };
    return this.http.post(`${this.apiUrl}`, body);
  }

  getCart(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  removeFromCart(userId: string, gameId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/${gameId}`);
  }

}
