import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  protected authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn
  readonly currentUser = this.authService.currentUser
}
