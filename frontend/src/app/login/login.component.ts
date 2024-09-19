import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private crudService: CrudService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isAuthenticated = this.crudService.isAuthenticated(); 
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.loginError = false;
          localStorage.setItem('authToken', response.token);
          this.isAuthenticated = true; 
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.loginError = true;
          console.error('Error al iniciar sesión', error);
        }
      );
    }
  }

  logout(): void {
    this.crudService.logout(); 
    this.isAuthenticated = false; 
    this.router.navigate(['/login']); 
  }
}
