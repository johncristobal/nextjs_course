import { FC, useEffect, useReducer } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';
import { CartContext, CartReducer } from './';
import Cookie from "js-cookie";
import { tesloApi } from '../../api';
import { IOrder } from '../../interfaces/order';
import axios, { AxiosError } from 'axios';

interface Props{
    children: JSX.Element
}

export interface CartState {
    loaded: boolean;
    cart: ICartProduct[];
    items: number;
    subtotal: number;
    tax: number;
    total: number;
    shippingAddres?: ShippingAddress;
}

const Cart_INITIAL_STATE: CartState = {
    loaded : false,
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    items: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    shippingAddres : undefined,
}

export const CartProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(CartReducer, Cart_INITIAL_STATE);

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart])

    useEffect(() => {
        try{
            const cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({
                type: 'Cart - Load Cart cookies',
                payload: cart
            })
        }catch(error){
            dispatch({
                type: 'Cart - Load Cart cookies',
                payload: []
            })
        }
    }, [])

    useEffect(() => {      
        try{
            dispatch({
                type: 'Cart - Load Address from cookie',
                payload: {
                    firstName: Cookie.get('firstName') || '',
                    lastName: Cookie.get('lastName') || '',
                    address: Cookie.get('address') || '',
                    address2: Cookie.get('address2') || '',
                    zip: Cookie.get('zip') || '',
                    city: Cookie.get('city') || '',
                    country: Cookie.get('country') || '',
                    phone: Cookie.get('phone') || '',
                }
            })
        }
        catch(error){
            dispatch({
                type: 'Cart - Load Address from cookie',
                payload: {
                    firstName: '',
                    lastName: '',
                    address: '',
                    address2: '',
                    zip: '',
                    city: '',
                    country: '',
                    phone: '',
                }
            })
        }
    }, [])
    

    useEffect(() => {
       
        //itera el anterior mas el actual para obtener el total de elementos/subtotal
        const items = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subtotal = state.cart.reduce((prev, current) => (current.quantity * current.price) + prev, 0);
        const tax = Number(process.env.NEXT_PUBLIC_TAX || 0);

        const orderSummary = {
            items,
            subtotal, 
            tax: subtotal * tax,
            total: subtotal * (tax + 1)
        }

        dispatch({
            type: "Cart - Order summsary",
            payload: orderSummary
        })

    }, [state.cart])
    
    const updateAddres = ( address: ShippingAddress) => {
        dispatch({
            type: "Cart - Update Address from cookie",
            payload: address
        })
    }

    const updateCartQ = (product: ICartProduct) => {
        dispatch({
            type: 'Cart - Update Q Product',
            payload: product
        })
    }

    const removeCartQ = (product: ICartProduct) => {
        dispatch({
            type: 'Cart - Delete Product Cart',
            payload: product
        })
    }    

    const addProduct = (product: ICartProduct) => {

        const existsInCart = state.cart.some( p => p._id === product._id)
        if(!existsInCart) return dispatch({
            type: 'Cart - Add Product',
            payload: [...state.cart, product]
        })

        const productoDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if(!productoDifferentSize) return dispatch({
            type: 'Cart - Add Product',
            payload: [...state.cart, product]
        })

        const updateProds = state.cart.map( p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            p.quantity += product.quantity;            
            return p;
        })

        dispatch({
            type: 'Cart - Add Product',
            payload: updateProds
        })
    }

    const createOrder = async (): Promise<{ hasError: boolean; msg: string; }> => {

        if (!state.shippingAddres){
            throw new Error("No direccion")
        }

        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddres,
            numberOfItems: state.items,
            subTotal: state.subtotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }

        try {
            const { data } = await tesloApi.post<IOrder>('/orders', body); 

            dispatch({
                type: 'Cart - Order complete'
            });

            return {
                hasError: false,
                msg: data._id!
            }

        }catch(error){
            console.log(error);
            if( axios.isAxiosError(error) ){
                const er = error as AxiosError
                return {
                    hasError: true,
                    msg: er.message
                }
            }else{
                return {
                    hasError: true,
                    msg: "vea admin"
                }
            }
        }
    }

    return (
    <CartContext.Provider value={{
       ...state,
       addProduct,
       updateCartQ,
       removeCartQ,
       updateAddres,
       createOrder
    }}>
        {children}

    </CartContext.Provider>
    )
}