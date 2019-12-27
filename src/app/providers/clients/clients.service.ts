import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// modelo - interface
import { Cliente } from 'src/app/components/clients/clients.component';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ClientGetAllAction, ClientGetAction } from 'src/app/components/clients/clients.actions';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private SERVER = 'http://localhost:8080';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor( private http: HttpClient,
               private _store: Store<AppState> ) { }

  loadEmpresas() {
    return this.http.get(`${ this.SERVER }/empresas`);
  }

  loadClientes() {
    return this.http.get(`${ this.SERVER }/clientes`)
  }

  loadCliente(id: number) {
    return this.http.get(`${ this.SERVER }/clientes`)
  }

  createClient(cliente: Cliente) {

    return this.http.post<any>(`${ this.SERVER }/clientes/new`, cliente, { headers: this.httpHeaders });

  }

  editClient(id_cliente: number, cliente: Cliente): Observable<any> {
    // let params = new HttpParams().set( 'id_cliente', cliente.id_cliente.toString() );
    // cliente.empresa.id_empresa = 2;
    console.log("cliente", cliente);
    return this.http.put<any>(`${ this.SERVER }/clientes/edit/?id_cliente=${id_cliente}`, cliente, { headers: this.httpHeaders });
  }

  deteleClient(id: number) {
    return this.http.delete(`${ this.SERVER }/clientes/delete/?id_cliente=${id}`, { headers: this.httpHeaders });
  }

}
