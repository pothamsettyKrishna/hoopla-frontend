import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../view-orders/order';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,) { }
  loginform(formData: any): Observable<any> {
    // make an http post call with the given url by passing the formData
    console.log(formData);
    console.log(this.http.post('http://localhost:2400/login', formData))
    return this.http.post('http://localhost:2400/login', formData);
  }

  buyProd(orderdata, username): Observable<any> {
    console.log(orderdata);
    return this.http.put('http://localhost:2400/update' + '/' + username, orderdata);
  }

  order(username): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:2400/getorders/' + username);
  }


}
