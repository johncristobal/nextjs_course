import { UIState } from './';

type UIAactionType = 
| { type: 'UI - Open sidebar' }
| { type: 'UI - Close sidebar' }

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
       default:
          return state;
    }
}