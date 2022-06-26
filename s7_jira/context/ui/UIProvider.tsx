import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props{
    children: JSX.Element
}

export interface UIState {
    sidemenuopen: boolean,
}

const UI_INITIAL_STATE: UIState = {
    sidemenuopen: false,
}

export const UIProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open sidebar'})
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close sidebar'})
    } 

    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu
        }}>
            {children}

        </UIContext.Provider>
    )
}