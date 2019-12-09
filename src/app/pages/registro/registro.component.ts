import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// service
import { AuthService } from 'src/app/providers/auth.service';

import Swal from 'sweetalert2';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UserModel;
  recordarUsuario = false;
  hide = true;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {

    this.usuario = new UserModel();

  }

  onSubmit( form: NgForm ) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario )
        .subscribe( response => {

          console.log(response);
          Swal.close();

          if (this.recordarUsuario) {
            localStorage.setItem('email', this.usuario.email);
          } else {
            localStorage.removeItem('email');
         }

          this.router.navigateByUrl('/home');

        }, (err) => {
          console.log(err.error.error.message);
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Error al autenticar',
            text: err.error.error.message
          });
        });

  }

}
