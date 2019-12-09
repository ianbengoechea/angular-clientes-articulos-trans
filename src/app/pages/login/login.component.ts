import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// service
import { AuthService } from 'src/app/providers/auth.service';

import Swal from 'sweetalert2';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new UserModel();
  recordarUsuario = false;
  hide = true;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarUsuario = true;
    }

  }

  login( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario )
      .subscribe( response => {

        console.log('login', response);
        Swal.close();

        if (this.recordarUsuario) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/clients');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message === 'INVALID_PASSWORD' ? 'PASSWORD O EMAIL INCORRECTO' : 'PASSWORD O EMAIL INCORRECTO'
        });
      });

  }
}
