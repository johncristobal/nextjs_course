import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
    entries: Entry[];
    addNewEntry: (descr: string) => void;
    updateEntry: (entry: Entry, showSnack: boolean ) => void;
}

export const EntriesContext = createContext({} as ContextProps);