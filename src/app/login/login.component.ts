import { Component, OnInit, Output, EventEmitter ,  HostBinding } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
// import {login} from '../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private logserv: LoginService, private router: Router) { }
  errorMessage: any;
  successMessage: any;
  loginForm: FormGroup;
  loggeduser = null;
  email;

  @Output()
 customevent: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
  }
  ngDoCheck() {
    this.loggeduser = sessionStorage.getItem('email');
    this.log();
  }
  // nav = this.router.navigate(['/']);
  log() {
    if (this.loggeduser != null) {
      this.router.navigate(['/']);
    }
  }
  login() {
    console.log(this.loginForm.value);

    this.errorMessage = null;
    this.successMessage = null;
    this.logserv.loginform(this.loginForm.value).subscribe(
      (success) => {this.router.navigate(['/dashboard']);
                    this.email = this.loginForm.value.userName;
                    sessionStorage.setItem('email', success.userdetails.userName);
    },
      (error) => {this.errorMessage = error.error.message; }
    );
  }
  emitevent() {
    console.log('this.loggeduser');
    this.customevent.emit(this.loggeduser);
  }




}
