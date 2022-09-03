import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { ShippingAddress } from './CartProvider';


interface ContextProps {
    loaded: boolean;
    cart: ICartProduct[];
    items: number;
    subtotal: number;
    tax: number;
    total: number;
    shippingAddres?: ShippingAddress
    addProduct: (product: ICartProduct) => void;
    updateCartQ: (product: ICartProduct) => void;
    removeCartQ: (product: ICartProduct) => void;
    updateAddres: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);