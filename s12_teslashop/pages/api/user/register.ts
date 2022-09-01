import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

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
        case 'POST':
            return registerUser(req, res)
        default:
            res.status(400).json({
                message: 'Bad'
            })
            break;
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   
    const { email = '', password='', name='' } = req.body;

    await db.connect();
    const user = await User.findOne({email});
    
    if ( password.lenght < 6){
        await db.disconnect();
        return res.status(400).json({
            message: 'Password invalido'
        })
    }

    if ( name.lenght < 3){
        await db.disconnect();
        return res.status(400).json({
            message: 'Nombre invalido'
        })
    }
    
    if (!validations.isValidEmail(email)){
        await db.disconnect();
        return res.status(400).json({
            message: 'Correo no valido'
        })
    }

    if(user){
        await db.disconnect();
        return res.status(400).json({
            message: 'Correo ya registrado'
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        name,
    });

    try{
        await newUser.save({ validateBeforeSave: true });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error server'
        })
    }

    await db.disconnect();

    const { _id, role } = newUser;

    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name
        }
    })   
}
