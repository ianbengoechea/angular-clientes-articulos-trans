import { Action } from '@ngrx/store';

// modelo de cliente
import { Cliente, Empresa } from './clients.component';


export const ACT_GET_ALL_CLIENTES = '[CLIENTES] GET_ALL_CLIENTES';
export const ACT_GET_CLIENTE = '[CLIENTE] GET_CLIENTE';
export const ACT_GET_ALL_EMPRESAS = '[EMPRESA] ACT_GET_ALL_EMPRESAS';
export const ACT_UPDATE_CLIENT = '[CLIENTE] ACT_UPDATE_CLIENT';
export const ACT_ADD_CLIENT = '[CLIENTE] ACT_ADD_CLIENT';
export const ACT_MODE_VIEW = '[CLIENTE] ACT_MODE_VIEW';
export const ACT_RESET_CLIENT = '[CLIENTE] ACT_RESET_CLIENT';


export class ClientGetAllAction implements Action {
    readonly type = ACT_GET_ALL_CLIENTES;
    constructor( public cliente?: Cliente[] ) {}
}

export class ClientGetAction implements Action {
    readonly type = ACT_GET_CLIENTE;
    constructor( public cliente: Cliente ) {}
}

export class EmpresaGetAllAction implements Action {
    readonly type = ACT_GET_ALL_EMPRESAS;
    constructor( public payload: Empresa[] ) {}
}

export class ClientUpdateAction implements Action {
    readonly type = ACT_UPDATE_CLIENT;
    constructor( public payload: Cliente, public id_cliente?: number ) {}
}

export class ClientAddAction implements Action {
    readonly type = ACT_ADD_CLIENT;
    constructor( public payload: Cliente ) {}
}

export class ClientModeView implements Action {
    readonly type = ACT_MODE_VIEW;
    constructor( public payload: boolean ) {}
}

export class ClientResetAction implements Action {
    readonly type = ACT_RESET_CLIENT;
}

export type accions =

EmpresaGetAllAction |
ClientGetAllAction |
ClientGetAction |
ClientUpdateAction |
ClientAddAction |
ClientModeView |
ClientResetAction;
