import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { TransactionsService } from '../services/transactions.service';
import { LogoutService } from '../services/logout.service';
import { VerifyTokenService } from '../services/verify-token.service';
import { AddTransaction, Category, NewTransaction } from '../models/transactions.model';
import { CanComponentDeactivate } from '../services/can-deactivate-guard.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('f') form: NgForm;
  expenseTransactionCategories: Category[];
  fetchCategories: Subscription;
  addTransaction: Subscription;

  constructor(
    private http: HttpClient,
    private transactionsService: TransactionsService,
    private router: Router,
    private verifyTokenService: VerifyTokenService,
    private logoutService: LogoutService) { }

  ngOnInit(): void {
    // this.verifyTokenService.verifyToken();

    this.fetchCategories = this.transactionsService.fetchAllExpenseTransactionCategories()
      .subscribe(
        (response: Category[]) => {
          console.log(response);
          this.expenseTransactionCategories = response;
          for (const category of this.expenseTransactionCategories) {
            switch (category.name) {
              case 'Eating out':
                category.description = 'Restaurants, fast food...';
                break;
              case 'Groceries':
                category.description = 'Green market, supermarket...';
                break;
              case 'Clothes':
                category.description = 'T-shirts, sneakers...';
                break;
              case 'Toiletries':
                category.description = 'Tooth paste, soap...';
                break;
              case 'Bills':
                category.description = 'Electrical, internet...';
                break;
              case 'Car':
                category.description = 'Gas, tires...';
                break;
              case 'Communication':
                category.description = 'Calls, SMS...';
                break;
              case 'Gift':
                category.description = 'Birthday, graduation....';
                break;
              case 'Transport':
                category.description = 'Bus, Tram...';
                break;
              case 'Health':
                category.description = 'Insurance, dentist...';
                break;
              case 'Sport':
                category.description = 'Gym, football...';
                break;
              case 'Pets':
                category.description = 'Food, toys...';
                break;
              case 'Entertainment':
                category.description = 'Cinema, Party...';
                break;
              case 'Taxi':
                category.description = 'Services';
            }
          }
        }
      );
  }

  onAddExpense() {
    const expense: NewTransaction = {
      amount: this.form.value.amount,
      category: this.form.value.category,
      currency: 'RSD',
      description: this.form.value.description
    };
    this.addTransaction = this.http.post<AddTransaction>(
      'https://budgetapp.digitalcube.rs/api/transactions',
      expense)
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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.form.value.amount || this.form.value.category || this.form.value.description) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.fetchCategories.unsubscribe();
    if (this.addTransaction) {
      this.addTransaction.unsubscribe();
    }
  }

}

