
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, catchError, map, withLatestFrom, switchMap } from 'rxjs/operators';

import * as clientActions from '../clients.actions';
import { ClientsService } from '../../../providers/clients/clients.service';
import { Cliente } from '../clients.component';
import { AppState } from '../../../app.reducer';

@Injectable()
export class ClienteEffects {

    constructor( private action$: Actions,
                 private api: ClientsService ,
                 private store: Store<AppState>
                 ) {}


    @Effect()
    updateClient$: Observable<Action> = this.action$.pipe(
        ofType<clientActions.ClientUpdateAction>(clientActions.ACT_UPDATE_CLIENT),
        withLatestFrom(this.store),
        mergeMap( ([action, state]: [clientActions.ClientUpdateAction, AppState]) =>
                this.api.editClient(action.payload.id_cliente, action.payload)),
        switchMap( _ => {
            return this.api.loadClientes().pipe(
                switchMap(
                (clients: Cliente[]) => [
                                        new clientActions.ClientGetAllAction( clients ),
                                        new clientActions.ClientResetAction()
                                        ])
            );
        })
    );

    @Effect()
    createClient$: Observable<Action> = this.action$.pipe(
        ofType<clientActions.ClientAddAction>(clientActions.ACT_ADD_CLIENT),
        withLatestFrom(this.store),
        mergeMap( ([action, state]: [clientActions.ClientAddAction, AppState]) =>
            this.api.createClient(action.payload)),
        switchMap( _ => {
            return this.api.loadClientes().pipe(switchMap(
                (clients: Cliente[]) => [
                                        new clientActions.ClientGetAllAction( clients ),
                                        new clientActions.ClientResetAction()
                                        ])
            );
        })
    );




}

