
import { UserModel } from '../../models/user.model';
import { Action } from '@ngrx/store';

export const LOGIN_USER = '[LOGIN] LOGIN_USER';

export class ActLoginUser implements Action {

    readonly type = LOGIN_USER

    constructor( public user: UserModel ) {}

}

export type accions = ActLoginUser;
