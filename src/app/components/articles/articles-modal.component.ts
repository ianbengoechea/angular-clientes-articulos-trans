// tslint:disable: no-string-literal
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, take, map } from 'rxjs/operators';
// ngrx
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import { CategoriaGetAllAction, ArticuloResetAction } from './article.actions';
// selectors
import { selectArticleCategorias, selectArticleModeView, selectArticleArticulo } from './article.selectors';
// form
import {Validators, FormBuilder } from '@angular/forms';
// custom errror handler
import { ErrorStateMatcher } from '@angular/material/core';
// interfaces,
import { Article, Categoria } from './articles.component';
import { ArticlesService } from '../../providers/articles/articles.service';

export interface Form {
  id_articulos: number;
  cantidad: number;
  descripcion: string;
  nombre: string;
  precio_unitario: number;
  categoria: {
    id_categoria: number,
    nombre: string,
  };
}

@Component({
  selector: 'app-articles-modal',
  templateUrl: './articles-modal.component.html',
  styleUrls: ['./articles-modal.component.css']
})
export class ArticlesModalComponent implements OnInit, OnDestroy {

  formValueChanges$: Observable<Form>;
  listaCategoria$: Observable<Categoria[]> = this.store.select(selectArticleCategorias);
  modeView$: Observable<boolean> = this.store.select(selectArticleModeView);

  // id_categoria = new FormControl({ value: this.data.categoria.id_categoria, disabled: this.data['isView'] });
  // nombre = new FormControl({ value: this.data.categoria.id_categoria, disabled: this.data['isView'] });
  // viewMode = this.data['isView'];

  form = this.fb.group({
    id_articulos: [''],
    cantidad: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    precio_unitario: ['', [Validators.required]],
    categoria: this.fb.group({
      id_categoria: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
  });

  constructor(
              private fb: FormBuilder,
              private store: Store<AppState>,
              private articlesService: ArticlesService,
              public dialogRef: MatDialogRef<ArticlesModalComponent>,
              ) {}

  ngOnInit() {

  this.articlesService.loadCategories()
      .subscribe( (ArrayCategorias: Categoria[]) => {
        this.store.dispatch( new CategoriaGetAllAction(ArrayCategorias) );
      });

  this.formValueChanges$ = this.form.valueChanges.pipe(
        debounceTime(500)
      );

  this.store
    .pipe( select(selectArticleArticulo), take(5) )
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


  ngOnDestroy() {
    // para evitar una fuga de memoria, me desuscribo a los observables? cuando? como?
    this.store.dispatch( new ArticuloResetAction() );
    console.log('MODAL, ME DESTRUÍ');
  }

  guardarCambios() {


    // busca el nombre de la categoria
    const categoriaNombre = this.form.get(['categoria', 'nombre']).value;
    // busca el id de la empresa seleccionada
    this.listaCategoria$.pipe( map( (categoria: Categoria[]) => {
      categoria.find( (item: Categoria) => {
        if ( item['nombre'] === categoriaNombre ) {
          return this.form.value.categoria.id_categoria = item['id_categoria'];
        } else { return; }
      });
    })).subscribe();

    // cierra el modal y envia el formulario si es valido
    // TODO cambiar esa validacion de id_cliente nulo
    if (this.form.valid || this.form.get('id_articulos').value === '' ) {
      this.dialogRef.close(this.form.value);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
