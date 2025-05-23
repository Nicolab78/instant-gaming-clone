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

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    console.log('ngOnInit lancé');
    this.gameService.getGames().subscribe({
      next: (data: any[]) => {
        console.log('Jeux récupérés :', data);
        this.games = data;
      },
      error: (err: any) => {
        console.error('Erreur API :', err);
      }
    });
  }
}


