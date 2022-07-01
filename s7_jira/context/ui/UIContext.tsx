import { createContext } from 'react';

interface ContextProps {
    sidemenuopen: boolean;
    isAdding: boolean;
    isDragging: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAdding: (flalg: boolean) => void;
    startDrag: () => void;
    endDrag: () => void;    
}

export const UIContext = createContext({} as ContextProps);