import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt } from '../../../utils';

type Data = 
| { message: string }
| {
    token: string;
    user: {
        email: string;
        role:string;
        name: string;
    }
}
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return validateToken(req, res)
        default:
            res.status(400).json({
                message: 'Bad request'
            })
            break;
    }
}

const validateToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   
    const { token = '' } = req.cookies;

    let userId = '';
    try{
        userId = await jwt.isValidToken( token );
    }catch(error){
        return res.status(401).json({
            message: 'Token no valido'
        })
    }

    await db.connect();
    const user = await User.findById( userId ).lean();
    await db.disconnect();

    if(!user){
        res.status(400).json({
            message: 'Correo o contraseña no valido'
        })
    }

    const { role, email, _id, name } = user!;

    return res.status(200).json({
        token: jwt.signToken(_id, email),
        user: {
            email, role, name
        }
    })   
}
