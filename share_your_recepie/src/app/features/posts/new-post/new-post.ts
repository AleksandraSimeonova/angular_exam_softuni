import { AfterViewInit, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RecipeService } from '../../../core/services';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-post',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './new-post.html',
  styleUrl: './new-post.css'
})
export class NewPost implements AfterViewInit {


  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  protected authService = inject(AuthService);

  protected ownerId: string | null = this.authService.getCurrentUserId();


  recipeForm: FormGroup

  constructor() {

    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|webp)/)]],
 
    });


  }

  ngAfterViewInit(): void {
    console.log(this.recipeForm);
    console.log(this.ownerId);
    

  }

  get title(): AbstractControl<any, any> | null {
    return this.recipeForm.get('title');
  }

  get ingredients(): AbstractControl<any, any> | null {
    return this.recipeForm.get('ingredients')
  }


  get instructions(): AbstractControl<any, any> | null {
    return this.recipeForm.get('instructions')
  }

  get imageUrl(): AbstractControl<any, any> | null {
    return this.recipeForm.get('imageUrl')
  }



  get titleValid(): boolean {
    return this.title?.invalid && (this.title?.dirty || this.title?.touched) || false
  }
  get ingredientslValid(): boolean {
    return this.ingredients?.invalid && (this.ingredients?.dirty || this.ingredients?.touched) || false
  }

  get instructionsValid(): boolean {
    return this.instructions?.invalid && (this.instructions?.dirty || this.instructions?.touched) || false
  }

  get imageUrlValid(): boolean {
    return this.imageUrl?.invalid && (this.imageUrl?.dirty || this.imageUrl?.touched) || false;
  }

  get titleErrorMessage(): string {

    if (this.title?.errors?.['required']) {

      return 'Title required!'
    }

    return ''
  }

  get ingredientsErrorMessage(): string {

    if (this.ingredients?.errors?.['required']) {
      return 'Ingredients is required'
    }

    return ''
  }
  get instructionsErrorMessage(): string {

    if (this.instructions?.errors?.['required']) {

      return 'Instructions required!'
    }

    return ''
  }

  onSubmit(): void {


    if (this.recipeForm.valid) {

      const { title, ingredients, instructions, imageUrl } = this.recipeForm.value;


      this.recipeService.create(

        {
          title,
          ingredients,
          instructions,
          imageUrl,
      
        }

      ).subscribe({
        next: () => {
          
          
          this.router.navigate(['/home'])
        },
        error: (err: Error) => {
          console.log('Registration failed', err);
          this.markFormGroupTouched();
        }
      })

    }


  }
  private markFormGroupTouched(): void {
    Object.keys(this.recipeForm.controls).forEach(key => {
      const control = this.recipeForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          const nestedControl = control.get(nestedKey)
          nestedControl?.markAllAsTouched();
        })
      } else {
        control?.markAsTouched();
      }
    })
  }



}
