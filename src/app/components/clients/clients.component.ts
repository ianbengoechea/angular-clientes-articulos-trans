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
import { Subscription, Observable } from 'rxjs';
import { ClientGetAllAction, ClientGetAction, ClientUpdateAction, ClientModeView, ClientAddAction } from './clients.actions';
import { map } from 'rxjs/operators';

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
  subscriptionClientList: Subscription;
  subscriptionClient: Subscription;
  ClientesArray: any = [];

  constructor(
              private clientesService: ClientsService,
              public dialog: MatDialog,
              private store: Store<AppState>) { }

  ngOnInit() {

    this.clientesService.loadClientes()
              .subscribe( (ArrayClientes: Cliente[]) => {
                this.store.dispatch( new ClientGetAllAction( ArrayClientes ) );
              });
    this.subscriptionClientList = this.store.select('clients')
                          .subscribe( client => this.dataSource = new MatTableDataSource(client.clientList));


  }

  ngOnDestroy() {
    this.subscriptionClientList.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // TODO: Hacer el open del modal en una sola funcion

  // carga el cliente en el store (para edit o vista)

  loadCliente( id: number, type?: string ) {
    console.log('entre a loadCliente, id', id, 'mi tipo es: ', type);
      // BUSCA EL CLIENTE POR ID, LO ALMACENA EN EL STORE Y LO ENVIA AL MODAL
    this.clientesService.loadCliente(id).pipe(map( (items: any[]) => {
      // console.log('[client-component] >> loadCliente >> id >>>', id)
      items.forEach( i => {
        if (i.id_cliente === id) {
          this.store.dispatch( new ClientGetAction( i ) );
        } else { return; }
      });
      return;
    })).subscribe();

    // si selecciona ver, se envia una accion que carga solo la vista, sino carga el formulario normal
    if ( type === 'VIEW') {
      this.store.dispatch( new ClientModeView( true ) );
    } else {
      this.store.dispatch( new ClientModeView( false ) );
    }
    // llama a la funcion para abrir el modal
    this.editOrViewModal();
  }

  editOrViewModal() {

    const dialogRef = this.dialog.open(ClientsModalComponent, { width: 'auto' });
    dialogRef.afterClosed().subscribe( (result: Cliente) => {

      if (!!result) {
          this.store.dispatch( new ClientUpdateAction(result, result.id_cliente) );
      }
    });
  }


  clientNew(): void {
    this.store.dispatch( new ClientModeView(false) );

    const dialogRef = this.dialog.open(ClientsModalComponent, { width: 'auto'});
    dialogRef.afterClosed().subscribe( (result: Cliente) => {

      if (!!result) {
        this.store.dispatch( new ClientAddAction(result) );
      }
    });
  }

  //   clientEdit(id: number): void {

  //     // BUSCA EL CLIENTE POR ID, LO ALMACENA EN EL STORE Y LO ENVIA AL MODAL
  //   this.clientesService.loadCliente(id).pipe(map( (items: any[]) => {
  //     // console.log('[client-component] >> loadCliente >> id >>>', id)
  //     items.forEach( i => {
  //       if (i.id_cliente === id) {
  //         this.store.dispatch( new ClientGetAction( i ) );
  //       } else { return; }
  //     });
  //     return;
  //   })).subscribe();


  //   const dialogRef = this.dialog.open(ClientsModalComponent, {
  //     width: 'auto',
  //   });

  //   dialogRef.afterClosed().subscribe( (result: Cliente) => {
  //     console.log('[CLIENT COMPONENT] >> clientEdit', result);

  //     if (!!result) {
  //         this.store.dispatch( new ClientUpdateAction(result, result.id_cliente) );
  //     }
  //   });
  // }

  clientDelete(id: number) {

    if (!!id) {
      this.clientesService.deteleClient( id );
            // .subscribe( () => {
            //   this.clientesService.getAllClients()
            //       .subscribe( (clientes: Cliente[]) => this.dataSource = new MatTableDataSource(clientes));
            // });
    }
  }

  // clientView(object): void {
  //   const dialogRef = this.dialog.open(ClientsModalComponent, {
  //     width: 'auto',
  //     data: {
  //       isView: true,
  //       id_cliente: null,
  //       firstname: object.firstname,
  //       lastname: object.lastname,
  //       email: object.email,
  //       country: object.country,
  //       telephone: object.telephone,
  //       empresa: {
  //         id_empresa: object.empresa.id_empresa,
  //         nombre: object.empresa.nombre
  //       }
  //     }
  //   });
  // }

}
