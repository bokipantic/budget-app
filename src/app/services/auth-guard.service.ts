import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LogoutService } from './logout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private logoutService: LogoutService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.http.get<any>
      ('https://budgetapp.digitalcube.rs/api/tenants/fe71fd8a-47c2-4f4d-84f8-312cf7413f7d/sessions',
      { observe: 'response' })
      .pipe(map(response => {
        if (response.status === 200) {
          return true;
        } else {
          alert(`Error ${response.status}: Username/password combination is not valid`);
          this.logoutService.logout();
        }
      }));
  }
}
