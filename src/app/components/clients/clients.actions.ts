import { Action } from '@ngrx/store';

// modelo de cliente
import { Cliente } from './clients.component';


export const ACT_GET_ALL_CLIENTES = '[CLIENTES] GET_ALL';

export class ClientGetAllAction implements Action {

  readonly type = ACT_GET_ALL_CLIENTES;

  constructor( public cliente: any ) {}

}

export type accions = ClientGetAllAction;
