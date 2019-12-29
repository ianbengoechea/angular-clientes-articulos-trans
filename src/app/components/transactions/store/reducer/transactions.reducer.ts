import * as TransactionActions from '../actions/transactions.actions';
import { Reporte } from '../../transactions.component';

export interface ReporteState {

  reporteList: Reporte[];
  reporte: Reporte;
  mode_view: boolean;

}

const initialState: ReporteState = {

  reporteList: [],
  reporte: null,
  mode_view: null

};

export const reporteReducer: (
                              state: ReporteState,
                              action: TransactionActions.accions ) =>
                              ReporteState = (state = initialState, action: TransactionActions.accions) => {

    switch (action.type) {
    case TransactionActions.ACT_GET_ALL_TRANSACTIONS:
        return { ...state, reporteList: action.payload  };
    case TransactionActions.ACT_GET_TRANSACTION:
        return { ...state, reporte: action.payload  };
    case TransactionActions.ACT_MODE_VIEW:
        return { ...state, mode_view: action.payload  };

    default:
        return state;
  }

};
