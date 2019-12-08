import { Component, OnInit } from '@angular/core';

// material components
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// services
import { ArticlesService } from '../../providers/articles/articles.service';

// components
import { ArticlesModalComponent } from './articles-modal.component';

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
export class ArticlesComponent implements OnInit {

  displayedColumns: string[] = ['id_articulos', 'nombre', 'precio_unitario', 'categoria', 'opciones'];
  dataSource: any = [];

  constructor(
              private ArticlesService: ArticlesService,
              public dialog: MatDialog ) { }

  ngOnInit() {

    this.ArticlesService.getAllArticles()
        .subscribe( (articulos: Article[]) => {
          console.log(articulos)
          this.dataSource = new MatTableDataSource(articulos);
          console.log('this.dataSource', this.dataSource);
        });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // TODO: Hacer el open del modal en una sola funcion
  // TODO: Ver como establecer la data por defecto sin enviarla por aca
  articleNew(): void {
    const dialogRef = this.dialog.open(ArticlesModalComponent, {
      width: 'auto',
      data: {
        isView: false,
        id_articulos: '',
        cantidad: '',
        descripcion: '',
        nombre: '',
        precio_unitario: '',
        categoria: {
          id_categoria: '',
          nombre: ''
        }
      }
    });
    dialogRef.afterClosed().subscribe( (result: Article) => {
      console.log('[ARTICLE-COMPONENT] >> articleNew', result);
      if (!!result) {
        this.ArticlesService.createArticle( result )
              .subscribe( () => {
                this.ArticlesService.getAllArticles()
                    .subscribe( (article: Article[]) => this.dataSource = new MatTableDataSource(article));
              });
            }
    });
  }

  articleEdit(object): void {
    const dialogRef = this.dialog.open(ArticlesModalComponent, {
      width: 'auto',
      data: {
        isView: false,
        id_articulos: object.id_articulos,
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
    dialogRef.afterClosed().subscribe( (result: Article) => {
      console.log('[ARTICLE-COMPONENT] >> articleEdit', result);

      if (!!result) {
      this.ArticlesService.editArticle( result )
            .subscribe( (response: any) => {
              console.log(response);
            });
          }
      // ACTUALIZA LA INFORMACION SIN IR AL SERVIDOR (PARA QUE SEA MAS RAPIDO) VER COMO IMPLEMENTAR, O HACER EL GET NUEVAMENTE
      if (!result) {
        return;
      }
      const id = result.id_articulos;
      const p = this.dataSource._data._value.findIndex( item => item.id_articulos === id);


      this.dataSource._data._value[p].nombre = result.nombre;
      this.dataSource._data._value[p].descripcion = result.descripcion;
      this.dataSource._data._value[p].cantidad = result.cantidad;
      this.dataSource._data._value[p].precio_unitario = result.precio_unitario;
      this.dataSource._data._value[p].categoria.categoria = result.categoria.id_categoria;
      this.dataSource._data._value[p].categoria.nombre = result.categoria.nombre;
    });
  }

  articleDelete(id: number) {

    if (!!id) {
      this.ArticlesService.deleteArticle( id )
            .subscribe( () => {
              this.ArticlesService.getAllArticles()
                  .subscribe( (articulo: Article[]) => this.dataSource = new MatTableDataSource(articulo));
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
