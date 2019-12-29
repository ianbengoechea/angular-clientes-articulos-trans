// tslint:disable: no-string-literal
import { Component, OnInit, OnDestroy } from '@angular/core';


// form
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormArray} from '@angular/forms';

// components
import { Reporte } from './transactions.component';
import { TransactionsService } from '../../providers/transactions/transactions.service';
import { AppState } from '../../app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { selectReportsReporte, selectReportsModeView } from './store/selectors/transactions.selectors';

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

  formValueChanges$: Observable<Form>;
  modeView$: Observable<boolean> = this.store.select(selectReportsModeView);

  form = this.fb.group({
    id_ventas: [''],
    comentarios: [''],
    fecha_venta: [''],
    cliente: this.fb.group({
      empresa: this.fb.group({
        nombre: [''],
      }),
    }),
    ventas_items: this.fb.array (this.buildArrayControl(null)),
  });

  buildArrayControl( data: any[] | null ): FormGroup[] {
    return data ?
    data.map( x => {
      return this.fb.group({
        id_venta_detalle: [x.id_venta_detalle ? x.id_venta_detalle : ''],
        cantidad: [x.cantidad ? x.cantidad : ''],
        total: [x.total ? x.total : ''],
        articulo: this.fb.group({
          id_articulos: [x.id_articulos ? x.id_articulos : ''],
          cantidad: [x.cantidad ? x.cantidad : ''],
          descripcion: [x.descripcion ? x.descripcion : ''],
          nombre: [x.nombre ? x.nombre : ''],
          precio_unitario: [x.precio_unitario ? x.precio_unitario : ''],
          categoria: this.fb.group({
          id_categoria: [x.id_categoria ? x.id_categoria : ''],
          nombre: [x.nombre ? x.nombre : '']
          })
        })
      });
    })
    :
    [this.fb.group({
      id_venta_detalle: [''],
      cantidad: [''],
      total: [''],
      articulo: this.fb.group({
        id_articulos: [''],
        cantidad: [''],
        descripcion: [''],
        nombre: [''],
        precio_unitario: [''],
        categoria: this.fb.group({
        id_categoria: [''],
        nombre: ['']
        })
      })
    })];
  }

  constructor(
              private store: Store<AppState>,
              private fb: FormBuilder,
              private transactionService: TransactionsService,
              public dialogRef: MatDialogRef<TransactionsModalComponent>,
              ) {}

  ngOnInit() {

    this.formValueChanges$ = this.form.valueChanges.pipe(
        debounceTime(500)
      );

    this.store
      .pipe( select(selectReportsReporte), take(5) )
      .subscribe(form => {
        if (!form ) {
          return;
        } else {
          this.form.patchValue({...form});
        }
      });

    this.modeView$.subscribe( (value: boolean) => {
        if (value) {
          this.form.disable();
        } else {
          return;
        }
      });

  }

  ngOnDestroy() {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
