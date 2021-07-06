import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { TransactionsService } from '../services/transactions.service';
import { VerifyTokenService } from '../services/verify-token.service';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, OnDestroy {
  totalItems: number;
  itemsPerPage: number;
  pageNumber: number;
  balance: number;
  allTransactions: any;
  transactionsSub: Subscription;
  // scrollHide: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private verifyTokenService: VerifyTokenService,
    private logoutService: LogoutService) { }

  ngOnInit(): void {
    this.verifyTokenService.verifyToken();

    this.transactionsSub = this.transactionsService.fetchTransactions(1, 8)
      .subscribe(
        response => {
          console.log(response);
          this.totalItems = response['summary'].total_items;
          this.itemsPerPage = response['summary'].per_page;
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

  onPaginate(pageEvent: PageEvent) {
    this.pageNumber = +pageEvent.pageIndex + 1;
    this.itemsPerPage = +pageEvent.pageSize;
    this.transactionsSub = this.transactionsService.fetchTransactions(this.pageNumber, this.itemsPerPage)
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
    this.transactionsSub.unsubscribe();
  }

}

// stopScrolling = fromEvent(window, 'scroll').pipe(
//   debounceTime(500)
// ).subscribe(
//   (event) => {
//     this.scrollHide = true;
//     setTimeout(() => {
//       this.scrollHide = false;
//     }, 3500);
//   }
// );

// @HostListener('window:scroll', ['$event'])
// onWindowScroll($event) {
//   if (window.scrollY) {
//     this.scrollHide = true;
//   }
//   else {
//     this.scrollHide = false;
//   }
// }