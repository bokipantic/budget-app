import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  fetchTransactions() {
    return this.http.get('https://budgetapp.digitalcube.rs/api/transactions'); // ?page=1&per_page=20
  }

  fetchAllIncomeTransactionCategories() {
    return this.http.get('https://budgetapp.digitalcube.rs/api/transactions/categories?category_type=income');
  }

  fetchAllExpenseTransactionCategories() {
    return this.http.get('https://budgetapp.digitalcube.rs/api/transactions/categories?category_type=outcome');
  }

  fetchTransactionsStatistics() {
    return this.http.get('https://budgetapp.digitalcube.rs/api/transactions/statistics?year=YYYY&month=MM');
  }
}
