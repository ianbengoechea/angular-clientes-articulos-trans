import { createSelector } from '@ngrx/store';

import { ClientState } from './clients.reducer';
import { AppState } from '../../app.reducer';


// selecciono de mi store global la parte que necesito
export const selectClients = (state: AppState) => state.clients;

// selecciono de esa parte, algo mas especifico
export const selectClientsClient = createSelector(
  selectClients,
  (state: ClientState) => state.client
);

export const selectClientsEmpresas = createSelector(
  selectClients,
  (state: ClientState) => state.empresaList
);

export const selectClientsModeView = createSelector(
  selectClients,
  (state: ClientState) => state.mode_view
);
