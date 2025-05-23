import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})

export class GameCardComponent {
  @Input() game: any;
}
