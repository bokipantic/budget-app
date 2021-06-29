import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TransactionsService } from '../services/transactions.service';
import { VerifyTokenService } from '../services/verify-token.service';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, OnDestroy {
  balance: number;
  allTransactions;
  scrollHide: boolean = false;
  fetchTransactions: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private verifyTokenService: VerifyTokenService,
    private logoutService: LogoutService) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (window.scrollY) {
      this.scrollHide = true;
    }
    else {
      this.scrollHide = false;
    }
  }

  ngOnInit(): void {
    this.verifyTokenService.verifyToken();
    this.fetchTransactions = this.transactionsService.fetchTransactions()
      .subscribe(
        response => {
          console.log(response);
          this.balance = response['summary'].balance;
          this.allTransactions = response['transactions'];
        },
        error => {
          console.log(error);
          alert(`Error ${error.status}: Token is not valid`);
          this.logoutService.logout();
        }
      );
  }

  getColor() {
    return this.balance >= 0 ? '#5E9C60' : '#E35959';
  }

  onAddIncome() {
    this.router.navigate(['income', 'add'], { relativeTo: this.route });
  }

  onAddExpense() {
    this.router.navigate(['expense', 'add'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.fetchTransactions.unsubscribe();
  }

}
