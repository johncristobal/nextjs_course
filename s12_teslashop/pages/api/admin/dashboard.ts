import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, User } from '../../../models';
import Product from '../../../models/Product';

type Data = 
| { name: string }
| {
    numberOrders: number;
    paidOrders: number;
    noPaidOrders: number;
    numberClients: number;
    numberProducts: number;
    noInventory: number;
    lowInventory: number;
}
export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();

    const [
        numberOrders,
        paidOrders,
        numberClients,
        numberProducts,
        noInventory,
        lowInventory,
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10} }).count(),

    ]);

    await db.disconnect();

    res.status(200).json({
        numberOrders,
        paidOrders,
        numberClients,
        numberProducts,
        noInventory,
        lowInventory,
        noPaidOrders: numberOrders - paidOrders,
    })
}
