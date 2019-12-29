// tslint:disable: no-string-literal
import { Component, OnInit, OnDestroy } from '@angular/core';

// material components
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

// services
import { TransactionsService } from '../../providers/transactions/transactions.service';

// components
import { TransactionsModalComponent } from './transactions-modal.component';


import { Moment } from 'moment';

// NGRX
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { TransactionsGetAllAction, TransactionsGetAction, TransactionsModeViewAction } from './store/actions/transactions.actions';
import { mergeMap, tap, switchMap, map } from 'rxjs/operators';


export interface Reporte extends Venta {

  id_ventas: number;
  comentarios: string;
  fecha_venta: Date;
}
export interface Venta extends Cliente {

  ventas_items: [{
    id_venta_detalle: number;
    cantidad: number;
    total: number;
    articulo: {
        id_articulos: number;
        cantidad: number;
        descripcion: string;
        nombre: string;
        precio_unitario: number;
        categoria: {
            id_categoria: number;
            nombre: string
        };
    }
  }];
}
export interface Cliente extends Empresa {
  id_cliente: number;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  telephone: number;
}
export interface Empresa {
  empresa?: {
    id_empresa: number;
    nombre?: string;
  };
}


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id_ventas', 'fecha_venta', 'empresa', 'email', 'telephone', 'opciones'];
  dataSource: any = [];
  selected: {startDate: Moment, endDate: Moment};
  dateValue = '';

  constructor(
              private store: Store<AppState>,
              private transactionService: TransactionsService,
              public dialog: MatDialog ) {}

  ngOnInit() {

    this.getReportes();
  }

  ngOnDestroy() {
// destruir las suscripciones cuando se vaya
  }
  getReportes() {
    this.dateValue = '';

    this.transactionService.loadReportes()
        .pipe(
          tap( (ReportsArray: Reporte[]) => {
            this.store.dispatch( new TransactionsGetAllAction(ReportsArray) );
          }),
          map( _ => {
            this.store.select('reports')
              .subscribe( reportsState => this.dataSource = new MatTableDataSource(reportsState.reporteList));
          })
        ).subscribe();
  }

  transactionView(id: number, type?: string): void {
    this.transactionService.loadReporte(id).pipe(map( (items: any[]) => {

      items.forEach( i => {
        if (i.id_ventas === id) {
          this.store.dispatch( new TransactionsGetAction(i) );
        } else { return; }
      });
      return;
    })).subscribe();

    if ( type === 'VIEW') {
      this.store.dispatch( new TransactionsModeViewAction(true) );
    }

    const dialogRef = this.dialog.open(TransactionsModalComponent, { width: 'auto' });
  }

  onChangeDate(event) {

    if ( !event.start || !event.end ) {
      return;
    } else {
      const startDate = event.start.format('YYYY-MM-DD');
      const endDate = event.end.format('YYYY-MM-DD');

      this.transactionService.getFilterTransaction(startDate, endDate)
        .subscribe( (ventaPorFecha: any) => this.dataSource = new MatTableDataSource(ventaPorFecha));
      }
    }


}
