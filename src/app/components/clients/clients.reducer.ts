import * as ClientAction from './clients.actions';

export interface State {

  ClientList: any[]

}

const CLIENT_INIT_STATE: State = {

  ClientList: []

}

export function clientReducer ( state = CLIENT_INIT_STATE, action: ClientAction.accions ): State {

  switch (action.type) {

    case ClientAction.ACT_GET_ALL_CLIENTES:
        return { ...state, ClientList: action.cliente  } // devolver el payload

    default:
        return state;
  }
}
