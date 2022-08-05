import type { NextApiRequest, NextApiResponse } from 'next'
import { SHOP_C, db } from '../../../../database'
import { IProduct } from '../../../../interfaces'
import { Product } from '../../../../models'

type Data = 
| { message: string }
| IProduct

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductsBySlug(req, res)
    
        default:
            return res.status(400).json({ message: 'bad request' })
    }    
}

const getProductsBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug } = req.query;

    await db.connect();
    const ps = await Product
        .findOne({slug})
        .lean();
    await db.disconnect();

    if(!ps){
        return res.status(404).json({ message: 'No encontrado' })
    }
    return res.status(200).json( ps );
}
