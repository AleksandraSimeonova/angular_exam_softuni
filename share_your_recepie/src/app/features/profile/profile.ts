import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services';
import { User } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  profileForm: FormGroup
  isEditMode: boolean = false;

  ///currentUser = this.authService.currentUser()
  get currentUser(): User | null {
    return this.authService.currentUser();
  }

  constructor() {

    this.profileForm = this.formBuilder.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],

    })
  }

  ngAfterViewInit(): void {
    console.log('Profile form:', this.currentUser);

  }

  get name(): AbstractControl<any, any> | null {
    return this.profileForm.get('name');
  }

  get email(): AbstractControl<any, any> | null {
    return this.profileForm.get('email')
  }

  get isUserNameValid(): boolean {
    return this.name?.invalid && (this.name?.dirty || this.name?.touched) || false
  }
  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false
  }


  get usernameErrorMessage(): string {

    if (this.name?.errors?.['required']) {

      return 'Username required!'
    }

    return ''
  }

  get emailErrorMessage(): string {

    if (this.email?.errors?.['required']) {
      return 'Email is required'
    }

    if (this.email?.errors?.['pattern']) {

      return 'Email is not valid'
    }

    return ''
  }

  onEdit(): void {
    const user = this.currentUser

    this.profileForm.patchValue({
      name: user?.name,
      email: user?.email,

    })
    this.isEditMode = true;
  }

  onCancel(): void {
    this.isEditMode = false;
    this.profileForm.reset();
  }

  onSave(): void {
    if (this.profileForm.valid) {
      const { name, email } = this.profileForm.value

      const user = <User>{
        _id: this.currentUser?._id,
        name: name,
        email: email,
        postedRecipes: this.currentUser?.postedRecipes || [],
        likedRecipes: this.currentUser?.likedRecipes || []

      };

      this.authService.update(user).subscribe({
      next: () => {
        this.isEditMode = false;
        this.profileForm.reset();
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });

      
    }
  }

}
