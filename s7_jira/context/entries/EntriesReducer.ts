import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesAactionType = 
| { type: '[Entry] - Add', payload:Entry }
| { type: '[Entry] - Update', payload:Entry }
| { type: '[Entry] - Refresh', payload:Entry[] }

export const entriesReducer = (state: EntriesState, action: EntriesAactionType) : EntriesState => {

   switch (action.type) {
      case '[Entry] - Add':
         return {
            ...state,
            entries: [...state.entries, action.payload ]
            }
         case '[Entry] - Update':
            return {
               ...state,
               entries: state.entries.map( entry => {
                  if (entry._id === action.payload._id){
                     entry.status = action.payload.status
                     entry.description = action.payload.description
                  }
                  return entry;
               })
            }
         case '[Entry] - Refresh':
            return {
               ...state,
               entries: [...action.payload]
            }
       default:
          return state;
    }
}