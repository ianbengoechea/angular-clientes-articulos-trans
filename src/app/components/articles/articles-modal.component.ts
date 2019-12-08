  // tslint:disable: no-string-literal
import { Component, OnInit, Inject } from '@angular/core';


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// form
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,} from '@angular/forms';

// custom errror handler
import { ErrorStateMatcher } from '@angular/material/core';

// components
import { Article } from './articles.component';
import { ClientsService } from '../../providers/clients/clients.service';
import { ArticlesService } from '../../providers/articles/articles.service';


// @TODO - create new class error handler
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-articles-modal',
  templateUrl: './articles-modal.component.html',
  styleUrls: ['./articles-modal.component.css']
})
export class ArticlesModalComponent implements OnInit {

  listaCategoria = [];
  id_categoria = new FormControl({ value: this.data.categoria.id_categoria, disabled: this.data['isView'] });
  nombre = new FormControl({ value: this.data.categoria.id_categoria, disabled: this.data['isView'] });
  viewMode = this.data['isView'];

  form = new FormGroup({
    cantidad: new FormControl({ value: this.data['cantidad'], disabled: this.data['isView'] }, Validators.required),
    descripcion: new FormControl({ value: this.data['descripcion'], disabled: this.data['isView']}, Validators.required),
    nombre: new FormControl({ value: this.data['nombre'], disabled: this.data['isView']}, Validators.required),
    precio_unitario: new FormControl({ value: this.data['precio_unitario'], disabled: this.data['isView']}, Validators.required),
    categoria: new FormGroup({
      id_categoria: this.id_categoria,
      nombre: this.nombre,
    })
  });

  get formNombre() {
    return this.form.get('nombre');
  }
  get formIdCategoria() {
    return this.form.get('categoria.id_categoria');
  }

  matcher = new MyErrorStateMatcher();

  constructor(
              private articlesService: ArticlesService,
              public dialogRef: MatDialogRef<ArticlesModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Article) {

                console.log(' data en el dialog component', data);
              }

  ngOnInit() {

    // TODO: Traer las categorias aca

    this.articlesService.getAllCategories()
        .subscribe( (categoria: any) => {
          console.log('[modal-component] categoria >>>', categoria);
          this.listaCategoria = categoria;
        });
  }

  guardarCambios() {
    const id = this.data.id_articulos;
    this.form.value.id_articulos = id;

    const idCategoriaNew = this.formIdCategoria.value;
    this.listaCategoria.filter( item => {
      if (item.id_categoria === idCategoriaNew) {
        this.form.value.categoria.nombre = item.nombre;
      }
    });

    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
