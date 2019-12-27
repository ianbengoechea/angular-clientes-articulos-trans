// tslint:disable: no-unused-expression

import { Component, OnInit, OnDestroy } from '@angular/core';

// material components
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// services
import { ArticlesService } from '../../providers/articles/articles.service';

// components
import { ArticlesModalComponent } from './articles-modal.component';
import Swal from 'sweetalert2';

// ngrx
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ArticuloGetAllAction, ArticuloGetOneAction, ArticuloModeViewAction, ArticuloUpdateAction, ArticuloAddAction } from './article.actions';
import { map } from 'rxjs/operators';

export interface Categoria {
  categoria: {
    id_categoria: number;
    nombre: string
  };
}

export interface Article extends Categoria {
  id_articulos: number;
  cantidad: number;
  descripcion: string;
  nombre: string;
  precio_unitario: number;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id_articulos', 'nombre', 'precio_unitario', 'categoria', 'opciones'];
  dataSource: any = [];
  subscriptionArticleList: Subscription;

  constructor(
              private articlesService: ArticlesService,
              public dialog: MatDialog,
              private store: Store<AppState>
              ) {}

  ngOnInit() {

    this.articlesService.loadArticles()
        .subscribe( (ArticlesArray: Article[]) => {
          this.store.dispatch( new ArticuloGetAllAction(ArticlesArray) );
        });

    this.subscriptionArticleList = this.store.select('articles')
        .subscribe( (ArticlesStore) => this.dataSource = new MatTableDataSource(ArticlesStore.articulos) );

  }

  ngOnDestroy() {
    this.subscriptionArticleList.unsubscribe();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadArticulo( id: number, type?: string ) {
    console.log('entre a loadArticulo, id', id, 'mi tipo es: ', type);
      // BUSCA EL ARTICULO POR ID, LO ALMACENA EN EL STORE Y LO ENVIA AL MODAL
    this.articlesService.loadArticle(id).pipe(map( (items: any[]) => {

      items.forEach( i => {
        if (i.id_articulos === id) {
          this.store.dispatch( new ArticuloGetOneAction(i) );
        } else { return; }
      });
      return;
    })).subscribe();

    // si selecciona ver, se envia una accion que carga solo la vista, sino carga el formulario normal
    if ( type === 'VIEW') {
      this.store.dispatch( new ArticuloModeViewAction(true) );
    } else {
      this.store.dispatch( new ArticuloModeViewAction(false) );
    }
    // llama a la funcion para abrir el modal
    this.editOrViewModal();
  }

  editOrViewModal() {

    const dialogRef = this.dialog.open(ArticlesModalComponent, { width: 'auto' });
    dialogRef.afterClosed().subscribe( (result: Article) => {

      if (!!result) {
          this.store.dispatch( new ArticuloUpdateAction(result, result.id_articulos) );
      }
    });
  }


  // TODO: Hacer el open del modal en una sola funcion
  // TODO: Ver como establecer la data por defecto sin enviarla por aca
  articleNew(): void {
    this.store.dispatch( new ArticuloModeViewAction(false) );
    const dialogRef = this.dialog.open(ArticlesModalComponent, { width: 'auto' });

    dialogRef.afterClosed().subscribe( (result: Article) => {
      !!result ? this.store.dispatch( new ArticuloAddAction(result) ) : null;
    });
  }

  articleDelete(id: number) {

    if (!!id) {
      Swal.fire({
        title: 'Quieres eliminar el articulo?',
        text: 'No se puede revertir esta accion',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        console.log('result.value', result.value)
        if (result.value) {
          this.articlesService.deleteArticle( id )
        .subscribe( () => {
          this.articlesService.loadArticles()
              .subscribe( (articulo: Article[]) => this.dataSource = new MatTableDataSource(articulo));
          Swal.fire(
                'Eliminado!',
                'El articulo ha sido eliminado.',
                'success'
              );
        }, (error) => {
              if (error.error.message.includes('existe') ) {
                return Swal.fire(
                'Error!',
                'No se puede eliminar el articulo porque existe registrada una venta',
                'error'
                );
              }
        });
        } else {
          return;
        }
    });
  }
}

  articleView(object): void {
    const dialogRef = this.dialog.open(ArticlesModalComponent, {
      width: 'auto',
      data: {
        isView: true,
        id_articulos: null,
        cantidad: object.cantidad,
        descripcion: object.descripcion,
        nombre: object.nombre,
        precio_unitario: object.precio_unitario,
        categoria: {
          id_categoria: object.categoria.id_categoria,
          nombre: object.categoria.nombre
        }
      }
    });
  }

}
