import { Action } from '@ngrx/store';

// modelo de cliente
import { Reporte } from '../../transactions.component';


export const ACT_GET_ALL_TRANSACTIONS = '[TRANSACTION] ACT_GET_ALL_TRANSACTIONS';
export const ACT_GET_TRANSACTION = '[TRANSACTION] ACT_GET_TRANSACTION';


export class TransactionsGetAllAction implements Action {
    readonly type = ACT_GET_ALL_TRANSACTIONS;
    constructor( public payload: Reporte[] ) {}
}

export class TransactionsGetAction implements Action {
    readonly type = ACT_GET_TRANSACTION;
    constructor( public payload: Reporte ) {}
}

export type accions =

TransactionsGetAllAction |
TransactionsGetAction;
