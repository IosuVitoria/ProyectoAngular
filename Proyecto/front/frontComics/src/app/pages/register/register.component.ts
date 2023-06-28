import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/interfaces/model';
import { Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComicService } from 'src/app/shared/services/comic.service';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-registrater',
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


// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { ComicService } from 'src/app/shared/services/comic.service';
// import { UserI } from 'src/interfaces/model';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit{
//   registerForm!: FormGroup;
//   submitted: boolean = false;
//   constructor(private form: FormBuilder, private authApi: ComicService, private router: Router){}
//   ngOnInit(): void {
//     this.registerForm = this.form.group({
//       email: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
//       password: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}')]]
//     })
//   }

//   onSubmit(){
//     console.log(this.registerForm.value);
//     this.submitted= true;
//     if(this.registerForm.valid){
//       console.log("He entrado")
//       let user: UserI = this.registerForm.value;
//       this.authApi.register(user).subscribe((data: any) => {
//         console.log(data);
//         this.router.navigate(['/login']);
//       })
//     }
//   }
// }