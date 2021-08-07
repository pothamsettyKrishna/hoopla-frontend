import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Products} from './products';

@Injectable({
  providedIn: 'root'
})
export class ViewproductsService {

  constructor(private http: HttpClient) { }

  viewproducts(item): Observable<Products[]> {
    return this.http.get<Products[]>('http://localhost:2400/fetchdetails' + '/' + item);
  }

  searchproducts(searchitem): Observable<Products[]> {
    return this.http.get<Products[]>('http://localhost:2400/searchdetails' + '/' + searchitem);
  }

  getAll(): Observable<Products[]> {
    return this.http.get<Products[]>('http://localhost:2400/getAll');
  }

  updateqty(orderdata): Observable<any> {
    console.log(orderdata);
    return this.http.put('http://localhost:2400/qty', orderdata);
  }
}

