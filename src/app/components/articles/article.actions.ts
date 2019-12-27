import { Action } from '@ngrx/store';

// modelo de cliente
import { Categoria, Article } from './articles.component';

export const ACT_GET_ALL_ARTICULOS = '[ARTICULO] GET_ALL_ARTICULO';
export const ACT_GET_ARTICULO = '[ARTICULO] GET_ARTICULO';
export const ACT_GET_ALL_CATEGORIAS = '[CATEGORIA] ACT_GET_ALL_CATEGORIAS';
export const ACT_UPDATE_ARTICULO = '[ARTICULO] ACT_UPDATE_ARTICULO';
export const ACT_ADD_ARTICULO = '[ARTICULO] ACT_ADD_ARTICULO';
export const ACT_MODE_VIEW = '[ARTICULO] ACT_MODE_VIEW';
export const ACT_RESET_ARTICULO = '[ARTICULO] ACT_RESET_ARTICULO';

export class ArticuloGetAllAction implements Action {
    readonly type = ACT_GET_ALL_ARTICULOS;
    constructor( public payload?: Article[] ) {}
}

export class ArticuloGetOneAction implements Action {
    readonly type = ACT_GET_ARTICULO;
    constructor( public payload: Article ) {}
}

export class CategoriaGetAllAction implements Action {
    readonly type = ACT_GET_ALL_CATEGORIAS;
    constructor( public payload: Categoria[] ) {}
}

export class ArticuloUpdateAction implements Action {
    readonly type = ACT_UPDATE_ARTICULO;
    constructor( public payload: Article, public idArticulo?: number ) {}
}

export class ArticuloAddAction implements Action {
    readonly type = ACT_ADD_ARTICULO;
    constructor( public payload: Article ) {}
}

export class ArticuloModeViewAction implements Action {
    readonly type = ACT_MODE_VIEW;
    constructor( public payload: boolean ) {}
}

export class ArticuloResetAction implements Action {
    readonly type = ACT_RESET_ARTICULO;
}

export type accions =

CategoriaGetAllAction |
ArticuloAddAction |
ArticuloGetAllAction |
ArticuloGetOneAction |
ArticuloUpdateAction |
ArticuloModeViewAction |
ArticuloResetAction;
