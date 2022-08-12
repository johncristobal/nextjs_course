import { UiState } from './';

type UiAactionType = 
    | { type: 'Ui - ToogleMenu' }

export const UiReducer = (state: UiState, action: UiAactionType) : UiState => {


   switch (action.type) {
      case 'Ui - ToogleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen
        }
       default:
          return state;
    }
}