import { FC, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { entriesReducer, EntriesContext } from '.';
import { v4 as uuidv4 } from 'uuid';

interface Props{
    children: JSX.Element
}

export interface EntriesState {
    entries: Entry[],
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'ped sldjsl asdaslk asd a',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'prog sldjsl asdaslk asd a',
            status: 'inprogress',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'finis sldjsl asdaslk asd a',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ],
}

export const EntriesProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = (descr: string) => {
        const newE : Entry = {
            _id: uuidv4(),
            description: descr,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({
            type: '[Entry] - Add',
            payload: newE
        })
    }

    const updateEntry = ( entry: Entry ) => {
        dispatch({
            type: '[Entry] - Update',
            payload: entry
        })
    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry
        }}>
            {children}

        </EntriesContext.Provider>
    )
}
