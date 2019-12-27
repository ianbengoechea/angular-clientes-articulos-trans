import * as ArticleAction from './article.actions';
import { Article, Categoria } from './articles.component';

export interface ArticleState {

  articulos: Article[];
  articuloSeleccionado: Article;
  categorias: Categoria[];
  mode_view: boolean;

}

const initialState: ArticleState = {

  articulos: [],
  articuloSeleccionado: null,
  categorias: [],
  mode_view: null

};

export const articleReducer: ( state: ArticleState, action: ArticleAction.accions ) =>
                              ArticleState = (state = initialState, action: ArticleAction.accions) => {
  switch (action.type) {

    case ArticleAction.ACT_GET_ALL_ARTICULOS:
        return { ...state, articulos: action.payload  };
    case ArticleAction.ACT_GET_ALL_CATEGORIAS:
        return { ...state, categorias: action.payload  };
    case ArticleAction.ACT_GET_ARTICULO:
        return { ...state, articuloSeleccionado: action.payload  };
    case ArticleAction.ACT_UPDATE_ARTICULO:
        return { ...state, articuloSeleccionado: action.payload  };
    case ArticleAction.ACT_ADD_ARTICULO:
      return { ...state, articuloSeleccionado: action.payload  };
    case ArticleAction.ACT_MODE_VIEW:
        return { ...state, mode_view: action.payload  };
    case ArticleAction.ACT_RESET_ARTICULO:
        return { ...state, articuloSeleccionado: null  };

    default:
        return state;
  }

};

export const getArticleSelected = (state: ArticleState) => state.articuloSeleccionado;
