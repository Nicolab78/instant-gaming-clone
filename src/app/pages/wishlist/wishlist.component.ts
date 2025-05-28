import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  userEmail: string = localStorage.getItem('userEmail') || '';
  message: string = '';
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.userEmail) {
      this.http.get<any[]>(`http://localhost:3000/api/wishlist/${this.userEmail}`)
        .subscribe({
          next: (data) => this.wishlist = data,
          error: (err) => {
            this.error = 'Erreur chargement wishlist';
            console.error(err);
          }
        });
    }
  }

  removeFromWishlist(gameId: number): void {
    const email = this.userEmail;
    if (!email) return;

    this.http.delete(`http://localhost:3000/api/wishlist/${email}/${gameId}`)
      .subscribe({
        next: () => {
          this.message = 'Jeu retiré de la wishlist';
          this.wishlist = this.wishlist.filter(game => game.id !== gameId);
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
  }
}