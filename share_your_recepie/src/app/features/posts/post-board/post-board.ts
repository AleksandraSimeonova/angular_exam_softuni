import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PostItem } from '../post-item/post-item';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../models';
import { Observable } from 'rxjs';
import { RecipeService } from '../../../core/services/posts.service';

@Component({
  selector: 'app-post-board',
  imports: [CommonModule, RouterLink, PostItem, RouterModule],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard {

  recepieId: string = '688de8bfdb859a6eae80ca94';
  recepies$: Observable<Recipe[]>;
  
  constructor(

    private recepieService: RecipeService) {
  
    this.recepies$ = this.recepieService.getAll();
   
  }

  trackById(index: number, recipe: Recipe): string {
  return recipe._id;
}


}
