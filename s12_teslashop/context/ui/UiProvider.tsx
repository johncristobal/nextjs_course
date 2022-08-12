import { FC, useReducer } from 'react';
import { UiContext, UiReducer } from './';

interface Props{
    children: JSX.Element
}

export interface UiState {
    isMenuOpen: boolean,
}

const Ui_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}

export const UiProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(UiReducer, Ui_INITIAL_STATE);

    const toogleSideMenu = () => {
        dispatch({ type: 'Ui - ToogleMenu'})
    }

    return (
    <UiContext.Provider value={{
        ...state,
        toogleSideMenu
    }}>
        {children}

    </UiContext.Provider>
    )
}