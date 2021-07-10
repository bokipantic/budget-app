import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { WalletComponent } from './wallet/wallet.component';
import { LogoutComponent } from './logout/logout.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AuthGuard } from './services/auth-guard.service';

const currentDate: Date = new Date();
const currentYear: number = currentDate.getFullYear();
const currentMonth: number = currentDate.getMonth() + 1;

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'wallet/income/add', component: AddIncomeComponent, canActivate: [AuthGuard] },
  { path: 'wallet/expense/add', component: AddExpenseComponent, canActivate: [AuthGuard] },
  { path: 'stats', redirectTo: `/stats/${currentYear}/${currentMonth}`, pathMatch: 'full' },
  { path: 'stats/:year/:month', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
