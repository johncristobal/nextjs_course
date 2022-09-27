import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { Order, Product } from '../../../models';
import { IOrder } from '../../../interfaces';
import { db } from '../../../database';

type Data = 
| { msg: string }
| IOrder

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder( req, res);
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderItems, total } = req.body as IOrder;
    const session: any = await getSession({ req });
    if ( !session ){
        return res.status(401).json({ msg: 'Debe estar auth' });
    }

    const pIds = orderItems.map( p => p._id );
    await db.connect();
    const dbProducts = await Product.find({ _id: { $in: pIds }});

    try{
        const subtotal = orderItems.reduce((prev, current) => {

            const currentPrice = dbProducts.find( p => p.id === current._id)?.price;
            if( !currentPrice ){
                throw new Error ("Producto no existe")
            }

            return (currentPrice * current.quantity) + prev
            
        }, 0);

        const tax = Number(process.env.NEXT_PUBLIC_TAX || 0);
        const backendTotal = subtotal * (tax + 1);

        if (total !== backendTotal){
            throw new Error ("No cuadra total");
        }
        
        const userid = session.user._id;
        const newOrder = new Order({ ...req.body, isPaid: false, user: userid });
        newOrder.total = Math.round( newOrder.total * 100 ) / 100;

        await newOrder.save();
        await db.disconnect();

        return res.status(200).json( newOrder );

    }catch(error: any){
        await db.disconnect();
        console.log(error);
        return res.status(401).json({ msg: error.messsage || 'Revise logs server' });
    }   
}
