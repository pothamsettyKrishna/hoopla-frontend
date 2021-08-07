import { Component, OnInit } from '@angular/core';
import { ViewproductsService } from '../dashboard/viewproducts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../dashboard/products';
import {Order} from '../view-orders/order';
import { LoginService } from '../login/login.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor( private viewserv: ViewproductsService, private router: ActivatedRoute, private r: Router,
               private logserv: LoginService ) { }
  pname;
  ordarray;
  pdetails: Products[];
  errorMessage = null;
  successMessage = null;
  email;
  notifymsg = null;

  ngOnInit() {
    this.router.params.subscribe((s) => {this.pname = s.name; });
    this.viewserv.searchproducts(this.pname).subscribe(
      (success) => {this.pdetails = success; },
      (error) => {this.errorMessage = error.error.message; }
    );
  }
  buy() {
    this.successMessage = null;
    this.errorMessage = null;
    this.email = sessionStorage.getItem('email');
    const od = new Order();
    const date = new Date();
    const price = (this.pdetails[0].price * (1 - this.pdetails[0].pSeller.pDiscount));
    od.date = date;
    od.price = price;
    od.pname = this.pdetails[0].pName;
    this.logserv.buyProd(od, this.email).subscribe(
      (success) => {this.ordarray = success;
                    this.successMessage = 'Order is placed';
      },
      (error) => {this.errorMessage = error.error.message; }
    );
    this.viewserv.updateqty(od).subscribe(
      (success) => {}
    );
  }
  back() {
    // this.r.navigate(['/dashboard']);
    history.back();
  }
  notifyme() {
    if (this.pdetails[0].pSeller.pQuantity === 0) {
      this.notifymsg = 'Notification will be sent when quantity is made available';
    }
  }


}
