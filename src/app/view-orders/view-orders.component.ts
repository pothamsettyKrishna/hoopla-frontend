import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import {Order} from '../view-orders/order';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  constructor(private logserv: LoginService , private router: Router) { }
  email;
  orderId = null;
  length = null;
  errorMessage = null;
  orders: Order[];
  public imgurl = 'assets/';
  public noimg = this.imgurl + 'no-order.jpg';

  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    this.logserv.order(this.email).subscribe(
      (success) => {
        this.orderId = 1001;
        this.orders = success;
        console.log(success);
        this.length = this.orders.length;
      },
      (error) => {this.errorMessage = error.error.message; }
    );
  }
  prodDesc(name) {
    this.router.navigate(['/product', name]);
  }
}
