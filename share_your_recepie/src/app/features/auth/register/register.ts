import { AfterViewInit, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  registerForm: FormGroup

  constructor() {

    this.registerForm = this.formBuilder.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        rePassword: ['', [Validators.required, this.passwordMatchValidator]]
      }),
    })
  }

  ngAfterViewInit(): void {
    console.log(this.registerForm);

  }

  get name(): AbstractControl<any, any> | null {
    return this.registerForm.get('name');
  }

  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get('email')
  }


  get passwords(): FormGroup<any> {
    return this.registerForm.get('passwords') as FormGroup
  }

  get password(): AbstractControl<any, any> | null {
    return this.passwords.get('password')
  }


  get rePassword(): AbstractControl<any, any> | null {
    return this.passwords.get('rePassword');
  }

  get isUserNameValid(): boolean {
    return this.name?.invalid && (this.name?.dirty || this.name?.touched) || false
  }
  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false
  }

  get isPasswordsValid(): boolean {
    return this.passwords?.invalid && (this.passwords?.dirty || this.passwords?.touched) || false;
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

  get passwordErrorMessage(): string {

    if (this.password?.errors?.['required']) {
      return 'Password is required!'
    }


    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    if (this.password?.errors?.['passwordMismatch']) {
      return 'Password and rePassword should be the same!'
    }

    return ''

  }

  get rePasswordErrorMessage(): string {
    if (this.password?.errors?.['required']) {
      return 'Password is required!';
    }

    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    if (this.password?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }


  private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
    const password = passwordsControl.get('password');
    const rePassword = passwordsControl.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true }
    }

    return null
  }


  isFormValid(): boolean {
    return true
  }

  onSubmit(): void {


    if (this.registerForm.valid) {

      const { name, email } = this.registerForm.value;
      const { password, rePassword } = this.registerForm.value.passwords

      this.authService.register(

        name,
        email,
        password,

        
      ).subscribe({
        next: () => {
          this.router.navigate(['/home'])
        },
        error: (err) => {
          console.log('Registration failed', err);
          this.markFormGroupTouched();
        }
      })

    }
  }


  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
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

