import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';


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

    createOrder: () => Promise<{ hasError: boolean; msg: string; }>;
}

export const CartContext = createContext({} as ContextProps);