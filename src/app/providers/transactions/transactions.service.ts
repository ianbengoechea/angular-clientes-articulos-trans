import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private SERVER = 'http://localhost:8080';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
              private http: HttpClient) { }

  loadReportes() {
    return this.http.get(`${ this.SERVER }/ventas`);
  }

  loadReporte( id: number ) {
    return this.http.get(`${ this.SERVER }/ventas`);
  }



  getFilterTransaction(startDate, endDate) {
    return this.http.get(`${ this.SERVER }/ventas/filtro?from=${startDate}&to=${endDate}`);
  }

  // getClientById() {

  // }

  // createClient(cliente: Cliente) {

  //   return this.http.post<any>(`${ this.SERVER }/clientes/new`, cliente, { headers: this.httpHeaders });

  // }

  // editClient(cliente: Cliente): Observable<any> {
  //   // let params = new HttpParams().set( 'id_cliente', cliente.id_cliente.toString() );
  //   // cliente.empresa.id_empresa = 2;
  //   console.log("cliente", cliente);
  //   return this.http.put<any>(`${ this.SERVER }/clientes/edit/?id_cliente=${cliente.id_cliente}`, cliente, { headers: this.httpHeaders });
  // }

  // deteleClient(id: number) {
  //   return this.http.delete(`${ this.SERVER }/clientes/delete/?id_cliente=${id}`, { headers: this.httpHeaders });
  // }

}
