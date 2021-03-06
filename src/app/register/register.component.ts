import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NewUser, User } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    const user: User = {
      username: form.value.username,
      password: form.value.password,
      first_name: form.value.firstName,
      last_name: form.value.lastName
    };
    this.http.post<NewUser>(
      'https://budgetapp.digitalcube.rs/api/tenants/fe71fd8a-47c2-4f4d-84f8-312cf7413f7d/users',
      user)
      .subscribe(response => {
        console.log(response);
        alert('User is successfully created');
        localStorage.setItem('token', JSON.stringify(response['token']));
        form.reset();
        this.router.navigate(['/wallet']);
      },
        error => {
          console.log(error);
          switch (error.status) {
            case 400:
              alert(`Error ${error.status}: Mandatory parameter is not valid or presented`);
              break;
            case 404:
              alert(`Error ${error.status}: Id tenant is not valid`);
              break;
            case 406:
              alert(`Error ${error.status}: User is already created`);
          }
        }
      );
  }
}