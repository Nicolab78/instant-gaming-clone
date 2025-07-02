import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// Update the import paths below if your files are located elsewhere
import { AdminGameFormComponent } from '../admin-game-form/admin-game-form.component';
import { AdminGameListComponent } from '../admin-game-list/admin-game-list.component';

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
  selector: 'app-admin-games',
  standalone: true,
  imports: [CommonModule, AdminGameFormComponent, AdminGameListComponent],
  templateUrl: './admin-games.component.html',
  styleUrls: ['./admin-games.component.scss']
})
export class AdminGamesComponent {
  @ViewChild(AdminGameListComponent) gameListComponent!: AdminGameListComponent;
 
  selectedGame: Game | null = null;

  onEditGame(game: Game) {
    console.log('onEditGame appelé avec:', game);
    this.selectedGame = { ...game }; // Copie pour éviter la référence
    console.log('selectedGame après copie:', this.selectedGame);
  }

  onGameCreated() {
    console.log('onGameCreated appelé');
    this.selectedGame = null;
    this.gameListComponent.refreshList();
  }

  onGameUpdated() {
    console.log('onGameUpdated appelé');
    this.selectedGame = null;
    this.gameListComponent.refreshList();
  }

  onFormCancelled() {
    console.log('onFormCancelled appelé');
    this.selectedGame = null;
  }
}