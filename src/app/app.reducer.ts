import * as fromClient from './components/clients/clients.reducer';
import * as fromLogin from './pages/login/login.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {

  userLogin: fromLogin.LoginState;
  clients: fromClient.State;

}

export const appReducers: ActionReducerMap<AppState> = {

  clients: fromClient.clientReducer,
  userLogin: fromLogin.loginReducer

}
