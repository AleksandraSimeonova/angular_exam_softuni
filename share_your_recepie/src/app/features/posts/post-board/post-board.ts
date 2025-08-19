import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PostItem } from '../post-item/post-item';
import { CommonModule } from '@angular/common';
import { Recipe, User } from '../../../models';
import { Observable } from 'rxjs';
import { RecipeService } from '../../../core/services/posts.service';

@Component({
  selector: 'app-post-board',
  imports: [CommonModule, RouterLink, PostItem, RouterModule],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard {


  users: User[] = [];

  recipeId: string = '';
  recipes$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {

    this.recipes$ = this.recipeService.getAll();
    console.log(this.recipes$);

    this.recipeService.getAllUsers().subscribe(users => {
      this.users = users;

    })
  }


  getUsernameById(id: string): string {
    const user = this.users.find(u => u._id === id);
    return user ? user.name : '';
  }

  trackById(index: number, recipe: Recipe): string {
    return recipe._id;
  }


}
