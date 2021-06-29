// ng g c logout --module app or ng g c logout -m app
import { Component, OnInit } from '@angular/core';

import { LogoutService } from '../services/logout.service';
import { VerifyTokenService } from '../services/verify-token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private logoutService: LogoutService,
    private verifyTokenService: VerifyTokenService) { }

  ngOnInit(): void {
    this.verifyTokenService.verifyToken();
  }

  onLogout() {
    this.logoutService.logout();
  }
}
