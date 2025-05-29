import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  addToCart(game: any, userEmail: string): Observable<any> {
    const body = {
      user_email: userEmail,
      game_id: game.id
    };
    return this.http.post(`${this.apiUrl}`, body);
  }

  getCart(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userEmail}`);
  }

  removeFromCart(userEmail: string, gameId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${userEmail}/${gameId}`);
}

}
