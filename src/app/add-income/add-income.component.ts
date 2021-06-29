import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TransactionsService } from '../services/transactions.service';
import { LogoutService } from '../services/logout.service';
import { VerifyTokenService } from '../services/verify-token.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  incomeTransactionCategories;
  fetchCategories: Subscription;
  addTransaction: Subscription;

  constructor(
    private http: HttpClient,
    private transactionsService: TransactionsService,
    private router: Router,
    private verifyTokenService: VerifyTokenService,
    private logoutService: LogoutService) { }

  ngOnInit(): void {
    this.verifyTokenService.verifyToken();
    this.fetchCategories = this.transactionsService.fetchAllIncomeTransactionCategories()
      .subscribe(
        response => {
          console.log(response);
          this.incomeTransactionCategories = response;
          for (const category of this.incomeTransactionCategories) {
            switch (category.name) {
              case 'Salary':
                category.description = 'You monthly job income';
                break;
              case 'Other':
                category.description = 'Other income you recieve';
            }
          }
        }
      );
  }

  onAddIncome() {
    const income = {
      amount: this.form.value.amount,
      category: this.form.value.category,
      currency: 'RSD',
      description: this.form.value.description
    };
    this.addTransaction = this.http.post(
      'https://budgetapp.digitalcube.rs/api/transactions',
      income)
      .subscribe(response => {
        console.log(response);
        alert('New transaction is successfully created');
        this.form.reset();
        this.router.navigate(['/wallet']);
      },
        error => {
          console.log(error);
          switch (error.status) {
            case 400:
              alert(`Error ${error.status}: Mandatory parameter is not valid or presented`);
              break;
            case 401:
              alert(`Error ${error.status}: Token is not valid`);
              this.logoutService.logout();
              break;
            case 404:
              alert(`Error ${error.status}: ${error.statusText}`);
              break;
            case 406:
              alert(`Error ${error.status}: Currency is different compared to previous transactions`);
          }
        }
      );
  }

  ngOnDestroy() {
    this.fetchCategories.unsubscribe();
    if (this.addTransaction) {
      this.addTransaction.unsubscribe();
    }
  }

}
