import { createSelector } from '@ngrx/store';

import { ReporteState } from '../reducer/transactions.reducer';
import { AppState } from '../../../../app.reducer';


// selecciono de mi store global la parte que necesito
export const selectReporte = (state: AppState) => state.reports;

// selecciono de esa parte, algo mas especifico
export const selectReportsReporte = createSelector(
  selectReporte,
  (state: ReporteState) => state.reporte
);

export const selectReportsReporteList = createSelector(
  selectReporte,
  (state: ReporteState) => state.reporteList
);

export const selectReportsModeView = createSelector(
  selectReporte,
  (state: ReporteState) => state.mode_view
);


