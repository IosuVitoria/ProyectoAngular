import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';


interface User {
  userName: string;
  email: string;
  password: string;
  role?: string;
}

interface ApiResponse {
  ok: boolean;
  data?: any;
  message?: string;
  _id?: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegistrationComponent {
  userName: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string | undefined;

  constructor(private http: HttpClient, public router: Router) {}

  async onRegistrationFormSubmit(event: Event) {
    event.preventDefault();

    const user: User = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      role: this.role

    };

    try {
      const response: ApiResponse | User | undefined = await this.updateUser(user).toPromise();

      console.log("Aquí registro usuarios");
      console.log(response);
      if (response && response?._id) {
        const userData = response;
        this.router.navigate(["/login"])   
        console.log(typeof userData);
      } else {
        const errorMessage = response?.message || 'Unknown error occurred.';
        this.showError(errorMessage);
        console.log("usuario erróneo");
      }
    } catch (error) {
      console.error(error);
      this.showError('An error occurred. Please try again later.');
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  updateUser(newUser: User) {
    return this.http.post<ApiResponse>('http://localhost:5000/users/register', newUser);
  }

}


