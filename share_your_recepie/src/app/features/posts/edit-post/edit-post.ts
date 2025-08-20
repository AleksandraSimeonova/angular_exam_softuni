import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostItem } from '../post-item/post-item';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService, RecipeService } from '../../../core/services';
import { Observable } from 'rxjs';
import { Recipe } from '../../../models';

@Component({
  selector: 'app-edit-post',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css'
})
export class EditPost implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private authService = inject(AuthService);

  recipeForm: FormGroup;
  recipeId: string | null = null;

  constructor() {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|webp)/)]],
    });
  }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.recipeService.getOne(this.recipeId).subscribe({
        next: (recipe) => {
          this.recipeForm.patchValue(recipe); // попълва формата
        },
        error: (err) => {
          console.error('Failed to load recipe', err);
        },
      });
    }
  }


  get title() {
    return this.recipeForm.get('title');
  }

  get ingredients() {
    return this.recipeForm.get('ingredients');
  }

  get instructions() {
    return this.recipeForm.get('instructions');
  }

  get imageUrl() {
    return this.recipeForm.get('imageUrl');
  }

  get titleErrorMessage(): string {
    if (this.title?.errors?.['required']) {
      return 'Title is requred!';
    }
    return '';
  }

  get ingredientsErrorMessage(): string {
    if (this.ingredients?.errors?.['required']) {
      return 'Ingredients are required!';
    }
    return '';
  }

  get instructionsErrorMessage(): string {
    if (this.instructions?.errors?.['required']) {
      return 'Instructions are required!';
    }
    return '';
  }


  onSubmit(): void {
    if (this.recipeForm.valid && this.recipeId) {
      this.recipeService.update(this.recipeId, this.recipeForm.value).subscribe({
        next: () => this.router.navigate(['/posts', this.recipeId]),
        error: (err) => {
          console.error('Update failed', err);
          this.markFormGroupTouched();
        },
      });
    }
  }


  private markFormGroupTouched(): void {
    Object.keys(this.recipeForm.controls).forEach(key => {
      const control = this.recipeForm.get(key);
      control?.markAsTouched();
    });
  }
}
