import { Injectable } from '@angular/core';

// component
import { ArticlesComponent, Article } from '../../components/articles/articles.component';

// service
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private SERVER = 'http://localhost:8080';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
              private http: HttpClient,
              private store: Store<AppState>
              ) {}

  loadArticles() {
    return this.http.get(`${ this.SERVER }/articulos`);
  }

  loadArticle(id: number) {
    return this.http.get(`${ this.SERVER }/articulos`);
  }

  loadCategories() {
    return this.http.get(`${ this.SERVER }/categorias`);
  }

  createArticle(article: Article) {

    return this.http.post<any>(`${ this.SERVER }/articulos/new`, article, { headers: this.httpHeaders });

  }

  editArticle(idArticle: number, articulo: Article): Observable<any> {
    // let params = new HttpParams().set( 'id_cliente', cliente.id_cliente.toString() );
    // cliente.empresa.id_empresa = 2;
    console.log("articulo", articulo);
    return this.http.put<any>(`${ this.SERVER }/articulos/edit/?id=${idArticle}`, articulo, { headers: this.httpHeaders });
  }

  deleteArticle(id: number) {
    return this.http.delete(`${ this.SERVER }/articulos/delete/?id=${id}`, { headers: this.httpHeaders });
  }

}
