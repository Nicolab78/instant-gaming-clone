import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game: any = null;
  reviews: any[] = [];
  newReview: string = '';

  userEmail: string = '';
  isConnected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');

    this.userEmail = localStorage.getItem('userEmail') || '';
    this.isConnected = !!localStorage.getItem('token');

    // Charger les infos du jeu
    this.http.get(`http://localhost:3000/api/games/${gameId}`).subscribe({
      next: (data) => this.game = data,
      error: (err) => console.error('Erreur chargement jeu', err)
    });

    // Charger les avis
    this.loadReviews();
  }

  loadReviews(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    this.http.get<any[]>(`http://localhost:3000/api/games/${gameId}/reviews`)
      .subscribe({
        next: (data) => this.reviews = data,
        error: (err) => console.error('Erreur chargement avis', err)
      });
  }

  addReview(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail || !this.newReview.trim()) {
      console.error('Email ou avis vide');
      return;
    }

    const body = {
      user_email: userEmail,
      content: this.newReview.trim()
    };

    console.log('Envoi du POST avec :', body);

    this.http.post(`http://localhost:3000/api/games/${gameId}/reviews`, body)
      .subscribe({
        next: () => {
          this.newReview = '';
          this.loadReviews();
        },
        error: (err) => {
          console.error('Erreur ajout avis', err);
        }
      });
  }

  addToWishlist(): void {
  const userEmail = localStorage.getItem('userEmail');
  const gameId = this.game.id;

  if (!userEmail || !gameId) {
    console.error('Champs manquants');
    return;
  }

  const body = {
    user_email: userEmail,
    game_id: gameId
  };

  this.http.post('http://localhost:3000/api/wishlist', body).subscribe({
    next: () => alert('Jeu ajouté à la wishlist !'),
    error: (err) => {
      console.error('Erreur lors de l’ajout à la wishlist.', err);
      alert('Erreur lors de l’ajout à la wishlist.');
    }
  });
}

  addToCart(): void {
  if (!this.userEmail || !this.game?.id) {
    console.error('Utilisateur non connecté ou ID de jeu manquant');
    alert("Tu dois être connecté pour ajouter au panier.");
    return;
  }

  this.cartService.addToCart(this.game, this.userEmail).subscribe({
    next: () => alert('Jeu ajouté au panier !'),
    error: (err) => {
      console.error('Erreur ajout panier', err);
      alert('Erreur lors de l’ajout au panier.');
    }
  });
}





}


