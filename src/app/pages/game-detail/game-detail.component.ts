import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');

    this.http.get(`http://localhost:3000/api/games/${gameId}`).subscribe({
      next: (data) => this.game = data,
      error: (err) => console.error('Erreur chargement jeu', err)
    });
  }
}
