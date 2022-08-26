import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';


interface ContextProps {
    cart: ICartProduct[];
    addProduct: (product: ICartProduct) => void;
    updateCartQ: (product: ICartProduct) => void;
    removeCartQ: (product: ICartProduct) => void;
    items: number;
    subtotal: number;
    tax: number;
    total: number;
}

export const CartContext = createContext({} as ContextProps);