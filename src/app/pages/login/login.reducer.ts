
import * as fromLogin from './login.actions';
import { UserModel } from 'src/app/models/user.model';

export interface LoginState {

  user: UserModel

}

const LOGIN_INITIAL_STATE: LoginState = {

  user: null

}

export function loginReducer ( state = LOGIN_INITIAL_STATE, action: fromLogin.accions ): LoginState {

  switch (action.type) {

    case fromLogin.LOGIN_USER:
          return {
            user: { ...action.user }
          };

    default:
        return state;
  }

}
