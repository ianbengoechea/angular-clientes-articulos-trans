import { Component, OnInit } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  links = [
    { path: '/clients', icon: 'face', title: 'Clients'},
    { path: '/articles', icon: 'shopping_basket', title: 'Articles'},
    { path: '/transactions', icon: 'work', title: 'Transactions'},
  ];
  title = 'angular-clientes-articulos-trans';
  $isAuth;

  constructor( private auth: AuthService, private router: Router ) {

  }

  ngOnInit() {
    this.auth.isLogIn.subscribe( resp => this.$isAuth = resp);
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  consoleLog() {
    console.log('this.$auth', this.$isAuth);
  }
}
