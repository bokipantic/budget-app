import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    return this.http.delete('https://budgetapp.digitalcube.rs/api/tenants/fe71fd8a-47c2-4f4d-84f8-312cf7413f7d/sessions')
      .subscribe(response => {
        this.router.navigate(['/']);
        localStorage.removeItem('token');
      },
        error => {
          console.log(error);
          switch (error.status) {
            case 401:
              alert(`Error ${error.status}: Token is not valid`);
              break;
            case 404:
              alert(`Error ${error.status}: Session doesn’t exist`);
          }
        }
      );
  }
}


