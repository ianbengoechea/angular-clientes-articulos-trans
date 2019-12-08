// tslint:disable: no-string-literal
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// material components
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// services
import { TransactionsService } from '../../providers/transactions/transactions.service';

// components
import { TransactionsModalComponent } from './transactions-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';


import { Moment } from 'moment';


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
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = ['id_ventas', 'fecha_venta', 'empresa', 'email', 'telephone', 'opciones'];
  dataSource: any = [];
  selected: {startDate: Moment, endDate: Moment};
  dateValue = '';

  constructor(
              private transactionService: TransactionsService,
              public dialog: MatDialog ) {}

  ngOnInit() {

    this.getAllTransactions();
  }

  getAllTransactions() {
    this.dateValue = '';

    this.transactionService.getAllTransaction()
          .subscribe( (venta: Reporte[]) => this.dataSource = new MatTableDataSource(venta));
  }

  transactionView(object: Reporte): void {
    const dialogRef = this.dialog.open(TransactionsModalComponent, {
      width: 'auto',
      data: {
        isView: false,
        nombre: object['cliente'].empresa.nombre,
        telephone: object['cliente'].telephone,
        email: object['cliente'].email,
        ventas_items: object['ventas_items'],
        fecha_venta: object.fecha_venta,
        comentario: object.comentarios,
      }
    });
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
