import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_C } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces/product';

type Data = 
| { message: string }
| IProduct[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
    
        default:
            return res.status(400).json({ message: 'bad request' })
    }    
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender = 'all' } = req.query;

    let condition = {};
    if (gender !== 'all' && SHOP_C.validGender.includes(`${gender}`)){
        condition = { gender };
    }

    await db.connect();
    const ps = await Product
        .find(condition)
        .select('title images prices inStock slug -_id')
        .lean();
    await db.disconnect();
    return res.status(200).json( ps );
}
