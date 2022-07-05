import { FC, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { entriesReducer, EntriesContext } from '.';
import { entriesApi } from '../../apis';
import EntryModel from '../../models/Entry';

interface Props{
    children: JSX.Element
}

export interface EntriesState {
    entries: Entry[],
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = async (descr: string) => {
        // const newE : Entry = {
        //     _id: uuidv4(),
        //     description: descr,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }

        const { data } = await entriesApi.post<Entry>('/entries', {
            description: descr
        });
        dispatch({
            type: '[Entry] - Add',
            payload: data
        })
    }

    const updateEntry = async ( entry: Entry ) => {

        try{
            const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
                description: entry.description,
                status: entry.status
            });
    
            dispatch({
                type: '[Entry] - Update',
                payload: data
            })
        }catch(error){

        }        
    }

    const refreshData = async () => {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({
            type: '[Entry] - Refresh',
            payload: data
        })
    }

    useEffect(() => {
        refreshData();
    }, [])
    

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
