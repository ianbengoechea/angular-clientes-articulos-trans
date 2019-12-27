import { createSelector } from '@ngrx/store';

import { ArticleState } from './article.reducer';
import { AppState } from '../../app.reducer';


// selecciono de mi store global la parte que necesito
export const SelectArticles = (state: AppState) => state.articles;

// selecciono de esa parte, algo mas especifico
export const selectArticlesArticulos = createSelector(
  SelectArticles,
  (state: ArticleState) => state.articulos
);

export const selectArticleCategorias = createSelector(
  SelectArticles,
  (state: ArticleState) => state.categorias
);

export const selectArticleArticulo = createSelector(
  SelectArticles,
  (state: ArticleState) => state.articuloSeleccionado
);

export const selectArticleModeView = createSelector(
  SelectArticles,
  (state: ArticleState) => state.mode_view
);
