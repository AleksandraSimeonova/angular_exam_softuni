import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PostItem } from '../post-item/post-item';
import { CommonModule } from '@angular/common';
import { Recipe, User } from '../../../models';
import { Observable } from 'rxjs';
import { RecipeService } from '../../../core/services/posts.service';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-post-board',
  imports: [CommonModule, PostItem, RouterModule, RouterLink],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard {

  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  private router = inject(RouterModule)
  private route = inject(Router)

  recipes$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {

    this.recipes$ = this.recipeService.getAll()
    console.log(this.recipes$);
    this.recipes$.subscribe(data => {
      console.log('Рецепти получени от API:', data);
    });


  }




}
