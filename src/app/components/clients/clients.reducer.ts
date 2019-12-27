import * as ClientAction from './clients.actions';
import { Cliente, Empresa } from './clients.component';

export interface ClientState {

  clientList: Cliente[];
  empresaList: Empresa[];
  client: Cliente;
  mode_view: boolean;

}

const CLIENT_INIT_STATE: ClientState = {

  clientList: [],
  empresaList: [],
  client: null,
  mode_view: null

};

export const clientReducer: (
                              state: ClientState,
                              action: ClientAction.accions ) =>
                              ClientState = (state = CLIENT_INIT_STATE, action: ClientAction.accions) => {
  switch (action.type) {

    case ClientAction.ACT_GET_ALL_CLIENTES:
        return { ...state, clientList: action.cliente  };
    case ClientAction.ACT_GET_ALL_EMPRESAS:
        return { ...state, empresaList: action.payload  };
    case ClientAction.ACT_GET_CLIENTE:
        return { ...state, client: action.cliente  };
    case ClientAction.ACT_UPDATE_CLIENT:
        return { ...state, client: action.payload  };
    case ClientAction.ACT_ADD_CLIENT:
      return { ...state, client: action.payload  };
    case ClientAction.ACT_MODE_VIEW:
        return { ...state, mode_view: action.payload  };
    case ClientAction.ACT_RESET_CLIENT:
        return { ...state, client: null  };

    default:
        return state;
  }

};

export const getClient = (state: ClientState) => state.client;
