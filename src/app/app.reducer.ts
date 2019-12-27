import * as fromClient from './components/clients/clients.reducer';
import * as fromLogin from './pages/login/login.reducer';
import * as fromArticle from './components/articles/article.reducer';
import * as fromReporte from './components/transactions/store/reducer/transactions.reducer';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  userLogin: fromLogin.LoginState;
  clients: fromClient.ClientState;
  articles: fromArticle.ArticleState;
  reports: fromReporte.ReporteState;
}

export const appReducers: ActionReducerMap<AppState> = {
  userLogin: fromLogin.loginReducer,
  clients: fromClient.clientReducer,
  articles: fromArticle.articleReducer,
  reports: fromReporte.reporteReducer
};

// selectores
// TODO ver si esta bien implementarlo aca o directamenete en el reducer propio
// export const getClientsState = createFeatureSelector<fromClient.ClientState>('clients');
// export const getLoginState = createFeatureSelector<fromLogin.LoginState>('user');
// export const getArticleState = createFeatureSelector<fromArticle.ArticleState>('articulos');
// export const getReporteState = createFeatureSelector<fromReporte.ReporteState>('reporteList');


