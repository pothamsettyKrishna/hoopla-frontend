import { Component, OnInit } from '@angular/core';
import { ViewproductsService } from './viewproducts.service';
import {Products} from './products';
import { Router } from '@angular/router';
import {Order} from '../view-orders/order';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private viewserv: ViewproductsService , private router: Router, private logserv: LoginService) { }
  loggeduser;
  categories ;
  errorMessage;
  successMessage;
  item = null;
  searchp = false;
  imgurl = 'assets/';
  pic1 = this.imgurl + 'vkpk.jpg';
  prodDetails: Products[];
  searchDetails: Products[];
  searchedprod = null;
  dash: Products[];
  select = null;
  qty;
  totaldetails: Products[];
  ngOnInit() {
    this.loggeduser = sessionStorage.getItem('email');
    this.categories = ['Electronics', 'Furniture', 'Shoes', 'Clothing'];
    this.viewserv.viewproducts('Trending').subscribe(
      (success) => {this.dash = success; },
      (error) => {this.errorMessage = error.error.message; }
    );
  }
  viewcategory(item) {
    this.item = item;
    this.searchedprod = null;
    this.viewserv.viewproducts(item).subscribe(
      (success) => {this.prodDetails = success,
      this.dash = success; },
      (error) => {this.errorMessage = error.error.message; }
    );
    console.log(this.prodDetails);
  }
  searchItem(searchitem) {
    this.errorMessage = null;
    this.item = null;
    this.select = true;
    this.searchp = true;
    this.searchedprod = searchitem;
    console.log(this.searchedprod);
    this.viewserv.searchproducts(searchitem).subscribe(
      (success) => {
        console.log(success);
        this.searchDetails = success;
        console.log(this.searchDetails);
      },
      (error) => {this.errorMessage = error.error.message; }
    );
    console.log( this.searchDetails);

  }
  getAll() {
    this.viewserv.getAll().subscribe(
      (success) => {this.totaldetails = success; },
      (error) => {this.errorMessage = error.error.message; }
    );
  }

  prodDesc(name) {
    this.router.navigate(['/product', name]);
  }

  buy(name) {
    this.successMessage = null;
    this.errorMessage = null;
    this.loggeduser = sessionStorage.getItem('email');
    const od = new Order();
    const date = new Date();
    this.prodDetails.forEach((e) => {
      if (e.pName === name) {
        od.price = e.price * (1 - e.pSeller.pDiscount);
      }
    });
    console.log('price-->', od.price);
    od.date = date;
    od.pname = name;
    this.logserv.buyProd(od, this.loggeduser).subscribe(
      (success) => {
        this.successMessage = 'Order is placed';
      },
      (error) => {this.errorMessage = error.error.message; }
    );
    this.viewserv.updateqty(od).subscribe(
      (success) => {}
    );
  }
}
