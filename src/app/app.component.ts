import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  exit = null;
  title = 'Hoopla';
  loggeduser = null;
  name = '';
  view = null;
  ngOnInit() {
  }
  ngDoCheck() {
    console.log('docheck');
    this.loggeduser = sessionStorage.getItem('email');
  }


  logout() {
    console.log('exit');
    sessionStorage.clear();
    this.loggeduser = null;
    this.router.navigate(['/login']);
    this.exit = null;
  }
  login() {
    console.log('login');
    this.exit = 'login';
    this.router.navigate(['/login']);
    this.loggeduser = 'sucess';
  }
  orders() {
    console.log('login');
    this.router.navigate(['/vieworders']);
    this.view = true;
  }
  dash() {
    console.log('dashboard');
    this.router.navigate(['/dashboard']);
  }
  home() {
    this.view = null;
    this.router.navigate(['/dashboard']);

  }


}
