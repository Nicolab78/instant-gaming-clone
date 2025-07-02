import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class GameService {
  private apiUrl = 'http://localhost:3000/api/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any[]> {
    console.log('🛰️ Appel de getGames() vers :', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl);
  }

  
}