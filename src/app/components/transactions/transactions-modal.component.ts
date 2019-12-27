// tslint:disable: no-string-literal
import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';


// form
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormArray} from '@angular/forms';

// custom errror handler
import { ErrorStateMatcher } from '@angular/material/core';

// components
import { Reporte } from './transactions.component';
import { TransactionsService } from '../../providers/transactions/transactions.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface Form {
  id_ventas: number;
  comentarios: string;
  fecha_venta: number;
  cliente: {
    empresa: {
      nombre: string
    };
  };
  ventas_items: [{
    id_venta_detalle: number;
    cantidad: number;
    total: number
    articulo: {
      id_articulos: number;
      cantidad: number;
      descripcion: string;
      nombre: string;
      precio_unitario: number;
      categoria: {
        id_categoria: number;
        nombre: string
      }
    }
  }];
}

@Component({
  selector: 'app-transactions-modal',
  templateUrl: './transactions-modal.component.html',
  styleUrls: ['./transactions-modal.component.css']
})
export class TransactionsModalComponent implements OnInit, OnDestroy {

  listaReportes = [];
  ventasForm: FormGroup;
  ventasItems: FormArray;
  formValueChanges$: Observable<Form>;

  // dataVentas: Array<any> = this.data['ventas_items'];

  form = this.fb.group({
    id_ventas: [''],
    comentarios: [''],
    fecha_venta: [''],
    cliente: this.fb.group({
      empresa: {
        nombre: [''],
      },
    }),
    ventas_items: this.fb.array ([{
      id_venta_detalle: [''],
      cantidad: [''],
      total: [''],
      articulo: this.fb.group({
        id_articulos: [''],
        cantidad: [''],
        descripcion: [''],
        nombre: [''],
        precio_unitario: [''],
        categoria: {
          id_categoria: [''],
          nombre: [''],
        }
      })
    }]),
  });

  constructor(
              private store: Store<AppState>,
              private fb: FormBuilder,
              private transactionService: TransactionsService,
              public dialogRef: MatDialogRef<TransactionsModalComponent>,
              ) {}

  ngOnInit() {

  // this.createForm();

  // this.ventasItems = this.getArrayData();

  // while (this.getArrayData().length) {
  //     this.ventasItems.removeAt(0);
  //   }

  // for (const data of this.dataVentas) {
  //   console.log('en el for linea 99 >> data', data, 'this.dataVentas >>>', this.dataVentas);
  //   this.addMore(data);
  //   }
  }

  ngOnDestroy() {}

  // getArrayData() {
  //   return this.ventasForm.get('ventas_items') as FormArray;
  // }


  // addMore(data) {
  //   this.getArrayData().push(this.buildCusforms(data));
  // }

  // buildCusforms(data) {
  //   if (!data) {
  //     data = {
  //       id_venta_detalle: null,
  //       cantidad: null,
  //       total: null,
  //       articulo: {
  //         id_articulos: null,
  //         cantidad: null,
  //         descripcion: null,
  //         nombre: null,
  //         precio_unitario: null,
  //         categoria: {
  //           id_categoria: null,
  //           nombre: null
  //         }
  //       }
  //     };
  //   }
  //   return this.fb.group({
  //     id_venta_detalle: this.fb.control({ value: data.id_venta_detalle, disabled: this.data['isView'] }),
  //     cantidad: this.fb.control({ value: data.cantidad, disabled: this.data['isView'] }),
  //     total: this.fb.control({ value: data.total, disabled: this.data['isView'] }),
  //     articulo: this.fb.group({
  //       id_articulos: this.fb.control({ value: data.articulo.id_articulos, disabled: this.data['isView'] }),
  //       cantidad: this.fb.control({ value: data.articulo.cantidad, disabled: this.data['isView'] }),
  //       descripcion: this.fb.control({ value: data.articulo.descripcion, disabled: this.data['isView'] }),
  //       nombre: this.fb.control({ value: data.articulo.nombre, disabled: this.data['isView'] }),
  //       precio_unitario: this.fb.control({ value: data.articulo.precio_unitario, disabled: this.data['isView'] }),
  //     }),
  //       categoria: this.fb.group ({
  //         id_categoria: this.fb.control({ value: data.articulo.categoria.id_categoria, disabled: this.data['isView'] }),
  //         nombre: this.fb.control({ value: data.articulo.categoria.nombre, disabled: this.data['isView'] })
  //       }),
  //   });
  // }


  // createForm() {
  //   this.ventasForm = this.fb.group({
  //     comentarios: this.fb.control({ value: this.data['comentarios'], disabled: this.data['isView']}),
  //     fecha_venta: this.fb.control({ value: this.data['fecha_venta'], disabled: this.data['isView']}),
  //     empresa: this.fb.control({ value: this.data['nombre'], disabled: this.data['isView'] }),
  //     ventas_items: this.fb.array([this.buildCusforms({
  //       id_venta_detalle: null,
  //       cantidad: null,
  //       total: null,
  //       articulo: {
  //         id_articulos: null,
  //         cantidad: null,
  //         descripcion: null,
  //         nombre: null,
  //         precio_unitario: null,
  //         categoria: {
  //           id_categoria: null,
  //           nombre: null
  //         }
  //       }
  //     })])
  //   });
  //   console.log('[FORM]', this.ventasForm);
  // }


}
