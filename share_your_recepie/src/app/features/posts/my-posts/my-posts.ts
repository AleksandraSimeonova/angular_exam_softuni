import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PostItem } from "../post-item/post-item";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { AuthService, RecipeService } from "../../../core/services";
import { Observable } from "rxjs";
import { Recipe } from "../../../models";


@Component({
  selector: 'app-my-posts',
  imports: [CommonModule, PostItem, RouterModule, RouterLink],
  templateUrl: './my-posts.html',
  styleUrl: './my-posts.css'
})
export class MyPosts {


  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  private router = inject(RouterModule)
  private route = inject(Router);

   recipes: Recipe[] | null = null;
  protected ownerId: string | null = this.authService.getCurrentUserId();

  recipes$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {

    this.recipes$ = this.recipeService.getAll()
    console.log(this.recipes$);
    this.recipes$.subscribe(data => {
      
      this.recipes = data.filter(recipe => recipe.ownerId === this.ownerId);
    console.log('Рецепти на текущия потребител:', this.recipes);
    });


  }



}
