import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, GameCardComponent, RouterModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  games: any[] = [];
  paginatedGames: any[] = [];

  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    console.log('ngOnInit lancé');
    this.gameService.getGames().subscribe({
      next: (data: any[]) => {
        console.log('Jeux récupérés :', data);
        this.games = data;
        this.totalPages = Math.ceil(this.games.length / this.itemsPerPage);
        this.updatePagination();
      },
      error: (err: any) => {
        console.error('Erreur API :', err);
      }
    });
  }


  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedGames = this.games.slice(start, end);

    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }


}


