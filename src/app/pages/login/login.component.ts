import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthService, 
    private router: Router
  ) {}

  onLogin() {
  console.log('Tentative de login avec', this.email, this.password);
  
  this.auth.login(this.email, this.password).subscribe({
    next: (res) => {
      console.log('Réponse backend =', res);
      this.auth.handleLoginSuccess(res.token, res.email);
    },
    error: (err) => {
      this.errorMessage = err.error.message || 'Erreur de connexion';
    }
  });
}

}
