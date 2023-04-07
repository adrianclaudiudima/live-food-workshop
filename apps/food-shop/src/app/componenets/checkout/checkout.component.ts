import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'livesession-food-workshop-angular-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  handleReload() {
    console.log('Reload from checkout')
  }
}
