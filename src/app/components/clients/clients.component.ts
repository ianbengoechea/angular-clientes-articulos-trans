import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// material components
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// services
import { ClientsService } from 'src/app/providers/clients/clients.service';

// components
import { ClientsModalComponent } from './clients-modal.component';

// NGRX
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

export interface Empresa {
  empresa?: {
    id_empresa: number;
    nombre?: string;
  };
}
export interface Cliente extends Empresa {
  id_cliente: number;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  telephone: number;

}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id_cliente', 'nombre', 'email', 'empresa', 'telephone', 'opciones'];
  dataSource: any = [];
  subscription: Subscription;
  ClientesArray: any = [];


  constructor(
              private clientesService: ClientsService,
              public dialog: MatDialog,
              private _store: Store<AppState>) { }

  ngOnInit() {

    this.clientesService.loadClientes();
    this.subscription = this._store.select('clients')
                          .subscribe( client => this.dataSource = new MatTableDataSource(client.ClientList));

  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // TODO: Hacer el open del modal en una sola funcion
  // TODO: Ver como establecer la data por defecto sin enviarla por aca
  clientNew(): void {
    console.log('apretado');
    const dialogRef = this.dialog.open(ClientsModalComponent, {
      width: 'auto',
      data: {
        isView: false,
        firstname: '',
        lastname: '',
        email: '',
        country: '',
        telephone: '',
        empresa: {
          id_empresa: '',
          nombre: ''
        }
      }
    });
    dialogRef.afterClosed().subscribe( (result: Cliente) => {
      console.log('[CLIENT COMPONENT] >> clientNew', result);
      if (!!result) {
        this.clientesService.createClient( result )
              .subscribe( () => {
                this.clientesService.getAllClients()
                    .subscribe( (clientes: Cliente[]) => this.dataSource = new MatTableDataSource(clientes));
              });
            }
    });
  }

  clientEdit(object): void {
    const dialogRef = this.dialog.open(ClientsModalComponent, {
      width: 'auto',
      data: {
        isView: false,
        id_cliente: object.id_cliente,
        firstname: object.firstname,
        lastname: object.lastname,
        email: object.email,
        country: object.country,
        telephone: object.telephone,
        empresa: {
          id_empresa: object.empresa.id_empresa,
          nombre: object.empresa.nombre
        }
      }
    });
    dialogRef.afterClosed().subscribe( (result: Cliente) => {
      console.log('[CLIENT COMPONENT] >> clientEdit', result);

      if (!!result) {
      this.clientesService.editClient( result )
            .subscribe( (response: any) => {
              console.log(response);
            });
          }
      // ACTUALIZA LA INFORMACION SIN IR AL SERVIDOR (PARA QUE SEA MAS RAPIDO) VER COMO IMPLEMENTAR, O HACER EL GET NUEVAMENTE
      if (!result) {
        return;
      }
      const id = result.id_cliente;
      const p = this.dataSource._data._value.findIndex( item => item.id_cliente === id);


      this.dataSource._data._value[p].firstname = result.firstname;
      this.dataSource._data._value[p].lastname = result.lastname;
      this.dataSource._data._value[p].email = result.email;
      this.dataSource._data._value[p].country = result.country;
      this.dataSource._data._value[p].telephone = result.telephone;
      this.dataSource._data._value[p].empresa.id_empresa = result.empresa.id_empresa;
      this.dataSource._data._value[p].empresa.nombre = result.empresa.nombre;
    });
  }

  clientDelete(id: number) {

    if (!!id) {
      this.clientesService.deteleClient( id )
            .subscribe( () => {
              this.clientesService.getAllClients()
                  .subscribe( (clientes: Cliente[]) => this.dataSource = new MatTableDataSource(clientes));
            });
    }
  }

  clientView(object): void {
    const dialogRef = this.dialog.open(ClientsModalComponent, {
      width: 'auto',
      data: {
        isView: true,
        id_cliente: null,
        firstname: object.firstname,
        lastname: object.lastname,
        email: object.email,
        country: object.country,
        telephone: object.telephone,
        empresa: {
          id_empresa: object.empresa.id_empresa,
          nombre: object.empresa.nombre
        }
      }
    });
  }

}
