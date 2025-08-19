import { Component, inject, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService, RecipeService } from '../../../core/services';
import { PostItem } from '../post-item/post-item';
import { PostBoard } from '../post-board/post-board';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-content',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PostItem, RouterModule, RouterLink],
  templateUrl: './post-content.html',
  styleUrl: './post-content.css'
})
export class PostContent implements OnInit {

  private route1 = inject(Router)
  recipe: Recipe | null = null;
  recipe$: Observable<Recipe> | undefined;

  protected authService = inject(AuthService);

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    ///// if (recipeId) {
    /////   this.recipeService.getOne(recipeId).subscribe({
    /////     next: (data) => this.recipe = data,
    /////     error: (err) => console.error('Error loading recipe:', err)
    /////   });
    ///// }

    const recipeId = this.route.snapshot.paramMap.get('id');

    if (recipeId) {
      this.recipe$ = this.recipeService.getOne(recipeId);
    } else {
      console.warn('Няма ID в URL');
    }
    console.log(this.recipe$, recipeId);
  }




  isOwner: any;
  onDelete() {
    throw new Error('Method not implemented.');
  }
  onEdit() {
    throw new Error('Method not implemented.');
  }


}
