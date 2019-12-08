  // tslint:disable: no-string-literal
  import { Component, OnInit, Inject, Input } from '@angular/core';


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



// @TODO - create new class error handler
/** Error when invalid control is dirty, touched, or submitted. */
  export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

  @Component({
  selector: 'app-transactions-modal',
  templateUrl: './transactions-modal.component.html',
  styleUrls: ['./transactions-modal.component.css']
})
export class TransactionsModalComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  listaReportes = [];
  ventasForm: FormGroup;
  ventasItems: FormArray;
  dataVentas: Array<any> = this.data['ventas_items'];
  // id_empresa = new FormControl({ value: this.data.empresa.id_empresa, disabled: this.data['isView'] });
  // nombre = new FormControl({ value: this.data.empresa.id_empresa, disabled: this.data['isView'] });
  // viewMode = this.data['isView'];

  // tslint:disable: max-line-length
  // form = new FormGroup({
    // nombre: new FormControl({ value: this.data['cliente'].empresa.nombre, disabled: this.data['isView'] }, Validators.required),
    // telephone: new FormControl({ value: this.data['cliente'].telephone, disabled: this.data['isView']}, Validators.required),
    // email: new FormControl({ value: this.data['cliente'].email, disabled: this.data['isView']}, Validators.required),
    // fecha_venta:  new FormControl({ value: this.data['fecha_venta'], disabled: this.data['isView']}, [ Validators.required, Validators.email]),
    // comentario:  new FormControl({ value: this.data['comentarios'], disabled: this.data['isView']}, [ Validators.required, Validators.email]),
    // ventas_items: this.ventasItems
    // new FormGroup({
    //   nombre_articulo: new FormControl({ value: this.data['ventas_items'].articulo.nombre , disabled: this.data['isView']}, [ Validators.required, Validators.email]),
    //   precio_unitario: new FormControl({ value: this.data['ventas_items'].articulo.precio_unitario, disabled: this.data['isView']}, [ Validators.required, Validators.email]),
    //   cantidad: new FormControl({ value: this.data['ventas_items'].cantidad, disabled: this.data['isView']}, [ Validators.required, Validators.email]),
    //   total: new FormControl({ value: this.data['ventas_items'].total, disabled: this.data['isView']}, [ Validators.required, Validators.email]),
    // })
    // empresa: new FormGroup({
    //     id_empresa: this.id_empresa,
    //     nombre: this.nombre,
    // })
  // });

  // get user() {
  //   return this.form.get('firstname');
  // }
  // get idEmpresa() {
  //   return this.form.get('empresa.id_empresa');
  // }



  constructor(
              private fb: FormBuilder,
              private transactionService: TransactionsService,
              public dialogRef: MatDialogRef<TransactionsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                console.log('[MODAL-COMPONENT] RECIBO LA SIGUENTE DATA>>>', data);
              }

  ngOnInit() {

  //   this.clientesService.getAllTransaction()
  //       .subscribe( (reporte: any) => {
  //         console.log('[MODAL-COMPONENT] reporte >>>', reporte);
  //         this.listaReportes = reporte;
  //       });

  this.createForm();

  this.ventasItems = this.getArrayData();

  while (this.getArrayData().length) {
      this.ventasItems.removeAt(0)
    }

  for (const data of this.dataVentas) {
    console.log('en el for linea 99 >> data', data, 'this.dataVentas >>>', this.dataVentas);
    this.addMore(data);
    }
  }

  getArrayData() {
    return this.ventasForm.get('ventas_items') as FormArray;
  }

  addMore(data) {
    this.getArrayData().push(this.buildCusforms(data));
  }

  buildCusforms(data) {
    if (!data) {
      data = {
        id_venta_detalle: null,
        cantidad: null,
        total: null,
        articulo: {
          id_articulos: null,
          cantidad: null,
          descripcion: null,
          nombre: null,
          precio_unitario: null,
          categoria: {
            id_categoria: null,
            nombre: null
          }
        }
      };
    }
    return this.fb.group({
      id_venta_detalle: data.id_venta_detalle,
      cantidad: data.cantidad,
      total: data.total,
      articulo: {
        id_articulos: data.articulo.id_articulos,
        cantidad: data.articulo.cantidad,
        descripcion: data.articulo.descripcion,
        nombre: data.articulo.nombre,
        precio_unitario: data.articulo.precio_unitario,
        categoria: {
          id_categoria: data.articulo.categoria.id_categoria,
          nombre: data.articulo.categoria.nombre
        }
      }
    });
  }


  createForm() {
    this.ventasForm = this.fb.group({
      comentarios: this.fb.control({ value: this.data['comentarios'], disabled: this.data['isView']}),
      fecha_venta: this.fb.control({ value: this.data['fecha_venta'], disabled: this.data['isView']}),
      cliente: this.fb.group({
        empresa: this.fb.control({ value: this.data['nombre'], disabled: this.data['isView'] })
      }),
      ventas_items: this.fb.array([this.buildCusforms({
        id_venta_detalle: null,
        cantidad: null,
        total: null,
        articulo: {
          id_articulos: null,
          cantidad: null,
          descripcion: null,
          nombre: null,
          precio_unitario: null,
          categoria: {
            id_categoria: null,
            nombre: null
          }
        }
      })])
    });
    console.log('[FORM]', this.ventasForm)
  }

}
