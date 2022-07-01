import { UIState } from './';

type UIAactionType = 
| { type: 'UI - Open sidebar' }
| { type: 'UI - Close sidebar' }
| { type: 'UI - adding entry', payload:boolean }
| { type: 'UI - start drag' }
| { type: 'UI - end drag' }

export const uiReducer = (state: UIState, action: UIAactionType) : UIState => {

   switch (action.type) {
      case 'UI - Open sidebar':
         return {
            ...state,
               sidemenuopen: true
            }
       case 'UI - Close sidebar':
          return {
             ...state,
                sidemenuopen: false
          }
      case 'UI - adding entry':
         return {
            ...state,
            isAdding: action.payload
         }

      case 'UI - start drag':
         return {
            ...state,
            isDragging: true
         }
      
         case 'UI - end drag':
            return {
               ...state,
               isDragging: false
            }
       default:
          return state;
    }
}