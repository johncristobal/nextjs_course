import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces/order';

type Data = 
| { msg: string }
| IOrder[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getOrders(req, res);            
    
        default:
            return res.status(400).json({ msg: 'Bad reqeust' })
    }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const ordes = await Order.find()
        .sort({ createdAt: 'desc'})
        .populate('user', 'name email')
        .lean()

    await db.disconnect();

    return res.status(200).json(ordes);
}
