import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LogoutService } from './logout.service';
import { UserLogged } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenService {

  constructor(private http: HttpClient, private logoutService: LogoutService) { }

  verifyToken() {
    this.http.get<UserLogged>('https://budgetapp.digitalcube.rs/api/tenants/fe71fd8a-47c2-4f4d-84f8-312cf7413f7d/sessions')
      .subscribe(response => {
        console.log(response);
      },
        error => {
          console.log(error);
          alert(`Error ${error.status}: Username/password combination is not valid`);
          this.logoutService.logout();
        }
      );
  }
}