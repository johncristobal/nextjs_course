import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { db } from '../../../database';
import { IPaypal } from '../../../interfaces';
import { Order } from '../../../models';

type Data = {
    msg: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return payOrder(req,res);
    
        default:
            return res.status(400).json({
                msg: 'Bad request'
            })
    }
}

const getPyToken = async (): Promise<string | null> => {
    const payClient = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paySecret = process.env.PAYPAL_SECRET;

    const base65Token = Buffer.from(`${payClient}:${paySecret}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');
    try{
        const {data} = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${base65Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return data.access_token;

    }catch(error){
        if( axios.isAxiosError(error)){
            console.log(error.response?.data);
        }else{
            console.log(error);
        }
        return null;
    }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const payToken = await getPyToken();
    if(!payToken){
        return res.status(400).json({
            msg: 'No se pudo generar token paypal'
        })
    }

    const { transactionId='', orderId=''} = req.body;

    const { data } = await axios.get<IPaypal.PaypalOrderResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        headers: {
            'Authorization': `Bearer ${payToken}`
        }
    });

    if(data.status !== 'COMPLETED'){
        return res.status(401).json({
            msg: 'Orden no reconocida'
        })
    }

    await db.connect();
    const dbOrder = await Order.findById(orderId);
    if(!dbOrder){
        await db.disconnect();
        return res.status(401).json({
            msg: 'Orden no existe en db'
        })
    }

    if (dbOrder.total !== Number(data.purchase_units[0].amount.value)){
        await db.disconnect();
        return res.status(401).json({
            msg: 'Los montos no cuadran'
        })
    }

    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    await dbOrder.save();

    await db.disconnect();

    return res.status(200).json({
        msg: 'Orden pagada'
    })
}
