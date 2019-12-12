        // tslint:disable: no-string-literal

import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogIn = new ReplaySubject<boolean>();
  isLogIn = this._isLogIn.asObservable();

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private API_KEY = 'AIzaSyDV55wRDsXFoWGGY6U6D4TJJuhr83mNQ3I';
  userToken: string;


  constructor( private http: HttpClient) {

    this.leerToken();
  }

  logout() {

    localStorage.removeItem('token');
    this._isLogIn.next(false);
  }

  login( usuario?: UserModel ): Observable<any> {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/accounts:signInWithPassword?key=${ this.API_KEY }`,
      authData
    ).pipe(
      tap( authenticate => this._isLogIn.next(true)),
      map( resp => {
        console.log('[AUTH-SERVICE] >>> LOGIN >> OK >> RESPUESTA >> ', resp);
        this.guardarToken(resp['idToken']);
        return resp;
      }
    ));
  }

  nuevoUsuario( usuario: UserModel ) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/accounts:signUp?key=${ this.API_KEY }`,
      authData
    ).pipe(
      map( resp => {
        console.log('[AUTH-SERVICE] >>> REGISTRO >> OK >> RESPUESTA >> ', resp);
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string) {

    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );

    const hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }


}
