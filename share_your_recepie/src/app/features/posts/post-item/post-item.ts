import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Recipe, User } from '../../../models';
import { PostContent } from '../post-content/post-content';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-post-item',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './post-item.html',
  styleUrl: './post-item.css'
})
export class PostItem {

  @Input() recipe!: Recipe;
  @Input() users: User[] = [];
  private authService = inject(AuthService)
  private route = inject(Router)


   get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUserId(): string | null {
    return this.authService.getCurrentUserId(); ///add it 
  }
}
