import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props{
    children: JSX.Element
}

export interface UIState {
    sidemenuopen: boolean;
    isAdding: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuopen: false,
    isAdding: false,
    isDragging: false
}

export const UIProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open sidebar'})
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close sidebar'})
    } 

    const setIsAdding = (flag: boolean) => {
        dispatch({ type: 'UI - adding entry', payload: flag})
    }

    const startDrag = () => {
        dispatch({ type: 'UI - start drag'})
    } 

    const endDrag = () => {
        dispatch({ type: 'UI - end drag'})
    } 

    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            setIsAdding,
            startDrag,
            endDrag
        }}>
            {children}

        </UIContext.Provider>
    )
}