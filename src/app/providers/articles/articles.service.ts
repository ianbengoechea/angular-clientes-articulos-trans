import { Injectable } from '@angular/core';

// component
import { ArticlesComponent, Article } from '../../components/articles/articles.component';

// service
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private SERVER = 'http://localhost:8080';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get(`${ this.SERVER }/articulos`);
  }
  getAllCategories() {
    return this.http.get(`${ this.SERVER }/categorias`);
  }

  // getClientById() {

  // }

  createArticle(article: Article) {

    return this.http.post<any>(`${ this.SERVER }/articulos/new`, article, { headers: this.httpHeaders });

  }

  editArticle(articulo: Article): Observable<any> {
    // let params = new HttpParams().set( 'id_cliente', cliente.id_cliente.toString() );
    // cliente.empresa.id_empresa = 2;
    console.log("articulo", articulo);
    return this.http.put<any>(`${ this.SERVER }/articulos/edit/?id=${articulo.id_articulos}`, articulo, { headers: this.httpHeaders });
  }

  deleteArticle(id: number) {
    return this.http.delete(`${ this.SERVER }/articulos/delete/?id=${id}`, { headers: this.httpHeaders });
  }

}
