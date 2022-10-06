import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import formidable from 'formidable';
import fs from 'fs';

import {v2 as cloudinary} from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '');

type Data = 
| { message: string }
| IProduct[]
| IProduct

export const config = {
    api: {
        bodyParser: false
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'POST':
            return uploadFile( req, res )
        
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const parseFiles = async(req: NextApiRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files) => {

            if(err){
                return reject(err);
            }

            const filePath = await saveFile(files.file as formidable.File);
            resolve(filePath);
        });
    })
}

const saveFile = async(file: formidable.File): Promise<string> => {
    // const data = fs.readFileSync(file.filepath);
    // fs.writeFileSync(`./public/${file.originalFilename}`, data);
    // fs.unlinkSync( file.filepath );
    // return;

    const { secure_url } = await cloudinary.uploader.upload( file.filepath );
    return secure_url;
}


const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const imageurl = await parseFiles(req);

    return res.status(200).json({
        message: imageurl
    });



}