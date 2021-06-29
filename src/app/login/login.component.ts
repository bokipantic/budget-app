import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    const user = {
      username: form.value.username,
      password: form.value.password
    };
    this.http.post(
      'https://budgetapp.digitalcube.rs/api/tenants/fe71fd8a-47c2-4f4d-84f8-312cf7413f7d/sessions',
      user)
      .subscribe(response => {
        console.log(response);
        alert('New session is successfully created');
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
            case 401:
              alert(`Error ${error.status}: Username/password combination is not valid`);
          }
        }
      );
  }
}

// batigol1 
// 123
