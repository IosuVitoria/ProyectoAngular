import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}

interface LoginResponse {
  ok: boolean;
  message?: string;
  token?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  async onLoginFormSubmit(event: Event) {
    event.preventDefault();

    const user: User = {
      email: this.email,
      password: this.password
    };

    try {
      const response: LoginResponse | undefined = await this.http.post<LoginResponse>('http://localhost:5000/users/login', user).toPromise();
      console.log(response)
      if (response?.token) {
        this.router.navigate(['/home']);
        alert("Usuario registrado acaba de entrar a revisar documentos clasificados. Póngase en contacto con SHIELD para más información.")
      } else {
        const errorMessage = response?.message || 'Unknown error occurred.';
        this.showError(errorMessage);
      }
    } catch (error) {
      console.error(error);
      this.showError('An error occurred. Please try again later.');
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  goToRegistration() {
    this.router.navigate(['/register']);
  }
}
