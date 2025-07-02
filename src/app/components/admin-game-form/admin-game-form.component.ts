import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-admin-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-game-form.component.html',
  styleUrls: ['./admin-game-form.component.scss']
})
export class AdminGameFormComponent implements OnInit, OnChanges {
  @Input() editGame: Game | null = null;
  @Output() gameCreated = new EventEmitter<void>();
  @Output() gameUpdated = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();

  currentGame: Game = {
    title: '',
    description: '',
    price: 0,
    image_url: '',
    release_date: '',
    stock: 0
  };

  private apiUrl = 'http://localhost:3000/api/games';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateFormData();
  }

  ngOnChanges() {
    this.updateFormData();
  }

  updateFormData() {
    if (this.editGame) {
      this.currentGame = { ...this.editGame };
      
      // CONVERSION DE LA DATE POUR L'INPUT HTML
      if (this.editGame.release_date) {
        const date = new Date(this.editGame.release_date);
        this.currentGame.release_date = date.getFullYear() + '-' + 
          String(date.getMonth() + 1).padStart(2, '0') + '-' + 
          String(date.getDate()).padStart(2, '0');
      } else {
        this.currentGame.release_date = '';
      }
    } else {
      this.resetForm();
    }
  }

  private getAdminHeaders() {
    return {
      headers: {
        'user-role': 'admin'
      }
    };
  }

  submitGame() {
    if (!this.currentGame.title || !this.currentGame.price || !this.currentGame.description) {
      alert('Veuillez remplir les champs obligatoires (titre, prix, description)');
      return;
    }
    if (this.editGame) {
      this.updateGame();
    } else {
      this.createGame();
    }
  }

createGame() {
  // PAS de conversion de date, garde juste "2020-12-10"
  const gameToCreate = { ...this.currentGame };

  this.http.post<{ id: number }>(this.apiUrl, gameToCreate, this.getAdminHeaders()).subscribe({
    next: (response) => {
      alert('Jeu ajouté avec succès');
      this.resetForm();
      this.gameCreated.emit();
    },
    error: (error) => {
      alert('Erreur lors de l\'ajout du jeu');
      console.error('Erreur:', error);
    }
  });
}

updateGame() {
  if (!this.editGame?.id) return;

  // Garde juste la date au format YYYY-MM-DD
  const gameToUpdate = { ...this.currentGame, id: this.editGame.id };
  // PAS de conversion, garde juste "2020-12-10"

  this.http.put(`${this.apiUrl}/${this.editGame.id}`, gameToUpdate, this.getAdminHeaders()).subscribe({
    next: () => {
      alert('Jeu mis à jour avec succès');
      this.resetForm();
      this.gameUpdated.emit();
    },
    error: (error) => {
      alert('Erreur lors de la mise à jour du jeu');
      console.error('Erreur:', error);
    }
  });
}

  cancelEdit() {
    this.resetForm();
    this.formCancelled.emit();
  }

  resetForm() {
    this.currentGame = {
      title: '',
      description: '',
      price: 0,
      image_url: '',
      release_date: '',
      stock: 0
    };
    this.editGame = null;
  }
}