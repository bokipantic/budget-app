import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { LogoutService } from '../services/logout.service';
import { TransactionsService } from '../services/transactions.service';
import { VerifyTokenService } from '../services/verify-token.service';
import { Category, MonthStats } from '../models/stats.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  newDate: Date;
  year: number;
  month: number;
  expenses: number;
  income: number;
  total: number;
  monthStatistics: Category[];

  constructor(
    private transactionsService: TransactionsService,
    private verifyTokenService: VerifyTokenService,
    private logoutService: LogoutService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // this.verifyTokenService.verifyToken();

    this.route.params.pipe(
      switchMap((params: Params) => {
        this.year = +params['year'];
        this.month = +params['month'];
        this.newDate = new Date(this.year, this.month-1);
        return this.transactionsService.fetchTransactionsStatistics(this.year, this.month);
      })
    ).subscribe(
      (response: MonthStats) => {
        console.log(response);
        this.expenses = response['outcome'];
        this.income = response['income'];
        this.total = this.income - this.expenses;
        this.monthStatistics = response['by_category'];
      },
      error => {
        console.log(error);
        alert(`Error ${error.status}: Token is not valid`);
        this.logoutService.logout();
      }
    );
  }

  onPreviousMonth() {
    if (this.month === 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month--;
    }
    this.router.navigate(['/stats', this.year, this.month]);
  }

  onNextMonth() {
    if (this.month === 12) {
      this.month = 1;
      this.year++;
    } else {
      this.month++;
    }
    this.router.navigate(['/stats', this.year, this.month]);
  }

  getColor() {
    return this.total >= 0 ? '#5E9C60' : '#E35959';
  }

}
