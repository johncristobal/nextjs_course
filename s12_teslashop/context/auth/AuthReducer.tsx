import { IUser } from '../../interfaces';
import { AuthState } from './';

type AuthAactionType = 
    | { type: 'Auth - Login', payload: IUser }
    | { type: 'Auth - Logout' }

export const AuthReducer = (state: AuthState, action: AuthAactionType) : AuthState => {


   switch (action.type) {
    case 'Auth - Login':
         return {
            ...state,
            logged: true,
            user: action.payload
            }
    case 'Auth - Logout':
        return {
            ...state,
            logged: false,
            user: undefined
            }
       default:
          return state;
    }
}