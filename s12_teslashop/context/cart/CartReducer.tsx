import { CartState } from '.';
import { ICartProduct } from '../../interfaces';

type CartAactionType = 
    | { type: 'Cart - Load Cart cookies', payload: ICartProduct[] }
    | { type: 'Cart - Add Product', payload: ICartProduct[] }
    | { type: 'Cart - Update Q Product', payload: ICartProduct }
    | { type: 'Cart - Delete Product Cart', payload: ICartProduct }
    | { 
      type: 'Cart - Order summsary', 
      payload: {
         items: number;
         subtotal: number;
         tax: number;
         total: number;
     } 
   }

export const CartReducer = (state: CartState, action: CartAactionType) : CartState => {


   switch (action.type) {
      case 'Cart - Load Cart cookies':
         return {
            ...state,
            cart: [...action.payload]
         }

      case 'Cart - Add Product':
         return {
            ...state,
            cart: [ ...action.payload ]
         }

      case 'Cart - Update Q Product':
         return {
            ...state,
            cart: state.cart.map( p => {
               if(p._id !== action.payload._id) return p;
               if(p.size !== action.payload.size) return p;

               return action.payload;
            })
         }

      case 'Cart - Delete Product Cart':
         return {
            ...state,
            cart: state.cart.filter( p => !(p._id === action.payload._id && p.size === action.payload.size) )
         }

      case "Cart - Order summsary":
         return {
            ...state,
            ...action.payload

         }

       default:
          return state;
    }
}