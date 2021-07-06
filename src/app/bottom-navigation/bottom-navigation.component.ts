import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.css']
})
export class BottomNavigationComponent implements OnInit {
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth() + 1;

  constructor() { }

  ngOnInit(): void {
  }

}
