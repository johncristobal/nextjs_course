import { createContext } from 'react';

interface ContextProps {
    sidemenuopen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);