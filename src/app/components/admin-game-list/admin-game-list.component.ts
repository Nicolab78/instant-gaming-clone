import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Game {
  id?: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  release_date: string;
  stock: number;
}

@Component({
  selector: 'app-admin-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-game-list.component.html',
  styleUrls: ['./admin-game-list.component.scss']
})
export class AdminGameListComponent {
  @Output() editGameSelected = new EventEmitter<Game>();

  games: Game[] = [];
  private apiUrl = 'http://localhost:3000/api/games';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGames();
  }

  private getAdminHeaders() {
    return {
      headers: {
        'user-role': 'admin'
      }
    };
  }

  loadGames() {
    this.http.get<Game[]>(this.apiUrl).subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (error) => {
        alert('Erreur lors du chargement des jeux');
        console.error('Erreur:', error);
      }
    });
  }

  editGame(game: Game) {
    console.log('editGame dans admin-game-list appelé avec:', game);
    this.editGameSelected.emit(game);
  }

  deleteGame(gameId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
      this.http.delete(`${this.apiUrl}/${gameId}`, this.getAdminHeaders()).subscribe({
        next: () => {
          alert('Jeu supprimé avec succès');
          this.loadGames();
        },
        error: (error) => {
          alert('Erreur lors de la suppression du jeu');
          console.error('Erreur:', error);
        }
      });
    }
  }

  // Méthode pour rafraîchir la liste depuis le parent
  refreshList() {
    this.loadGames();
  }
}