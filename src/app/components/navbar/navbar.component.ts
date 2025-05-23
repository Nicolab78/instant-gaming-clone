import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  isLoggedIn = false;
  constructor(private auth: AuthService, private router: Router) {
  this.auth.isLoggedIn$.subscribe(value => {
    this.isLoggedIn = value;
  });
}

logout() {
    this.auth.logout(); 
  }

}
