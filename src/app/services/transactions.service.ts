import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MonthStats } from '../models/stats.model';
import { AllTransactions, Category } from '../models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  fetchTransactions(pageNumber, pageSize) {
    return this.http.get<AllTransactions>
      ('https://budgetapp.digitalcube.rs/api/transactions?page=' + pageNumber + '&per_page=' + pageSize);
  }

  fetchAllIncomeTransactionCategories() {
    return this.http.get<Category[]>
      ('https://budgetapp.digitalcube.rs/api/transactions/categories?category_type=income');
  }

  fetchAllExpenseTransactionCategories() {
    return this.http.get<Category[]>
      ('https://budgetapp.digitalcube.rs/api/transactions/categories?category_type=outcome');
  }

  fetchTransactionsStatistics(year: number, month: number) {
    return this.http.get<MonthStats>
      ('https://budgetapp.digitalcube.rs/api/transactions/statistics?year=' + year + '&month=' + month);
  }
}
