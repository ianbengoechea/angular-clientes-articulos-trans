
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, catchError, map, withLatestFrom, switchMap } from 'rxjs/operators';

import * as articleAction from '../article.actions';
import { AppState } from '../../../app.reducer';
import { ArticlesService } from '../../../providers/articles/articles.service';
import { Article } from '../articles.component';

@Injectable()
export class ArticleEffects {

    constructor( private action$: Actions,
                 private api: ArticlesService ,
                 private store: Store<AppState>
                 ) {}


    @Effect()
    updateArticle$: Observable<Action> = this.action$.pipe(
        ofType<articleAction.ArticuloUpdateAction>(articleAction.ACT_UPDATE_ARTICULO),
        withLatestFrom(this.store),
        mergeMap( ([action, state]: [articleAction.ArticuloUpdateAction, AppState]) =>
                this.api.editArticle(action.payload.id_articulos, action.payload)),
        switchMap( _ => {
            return this.api.loadArticles().pipe(
                switchMap(
                (ArticlesArray: Article[]) => [
                                                new articleAction.ArticuloGetAllAction( ArticlesArray ),
                                                new articleAction.ArticuloResetAction()
                                                ])
            );
        })
    );

    @Effect()
    createArticle$: Observable<Action> = this.action$.pipe(
        ofType<articleAction.ArticuloAddAction>(articleAction.ACT_ADD_ARTICULO),
        withLatestFrom(this.store),
        mergeMap( ([action, state]: [articleAction.ArticuloAddAction, AppState]) =>
            this.api.createArticle(action.payload)),
        switchMap( _ => {
            return this.api.loadArticles().pipe(switchMap(
                (ArticlesArray: Article[]) => [
                                                new articleAction.ArticuloGetAllAction( ArticlesArray ),
                                                new articleAction.ArticuloResetAction()
                                                ])
            );
        })
    );




}

