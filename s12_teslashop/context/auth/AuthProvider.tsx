import Cookies from 'js-cookie';
import { FC, useEffect, useReducer } from 'react';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, AuthReducer } from './';
import axios, {AxiosError} from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

interface Props{
    children: JSX.Element
}

export interface AuthState {
    logged: boolean;
    user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
    logged: false,
    user: undefined,
}

export const AuthProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(AuthReducer, Auth_INITIAL_STATE);
    const router = useRouter();

    const { data, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated'){
            dispatch({
                type: 'Auth - Login',
                payload: data?.user as IUser
            })
        }
    }, [status, data])
    
    // useEffect(() => {
    //     checkToken();
    // }, [])
    
    const checkToken = async () => {
        if(!Cookies.get('token')){
            return;
        }
        
        try{
            // el token ya viaja en la cookie
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);

            dispatch({
                type: "Auth - Login",
                payload: user
            })

        }catch(error){
            Cookies.remove('token');
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try{

            const { data } = await tesloApi.post('/user/login', {email, password});
            const { token, user } = data;
            Cookies.set('token', token);

            dispatch({
                type: "Auth - Login",
                payload: user
            })

            return true;

        }catch(error){
            return false;
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{hasError: boolean, message?:string}> => {
        try{

            const { data } = await tesloApi.post('/user/register', {name, email, password});
            const { token, user } = data;
            Cookies.set('token', token);

            dispatch({
                type: "Auth - Login",
                payload: user
            })
            return {
                hasError: false,
                message: ""
            }
        }catch(err){
            if( axios.isAxiosError(err) ){
                const error = err as AxiosError
                return {
                    hasError: true,
                    message: error.message
                }
            }else{
                return {
                    hasError: true,
                    message: "No se pudo crear usuario"
                }
            }
        }
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('cart');
        //borrar todos los cookies
        //router.reload();
        signOut();
    }

    return (
    <AuthContext.Provider value={{
       ...state,
       loginUser,
       registerUser,
       logout
    }}>
        {children}

    </AuthContext.Provider>
    )
}