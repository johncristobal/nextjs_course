import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'
import { isValidObjectId } from 'mongoose';

import {v2 as cloudinary} from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '');

type Data = 
| { message: string }
| IProduct[]
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getProducts( req, res )
        case 'PUT':
            return updateProducts( req, res )
        case 'POST':
            return createProduct( req, res )
        
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    //const { gender = 'all' } = req.query;

    //let condition = {};

    // if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
    //     condition = { gender };
    // }

    await db.connect();
    const products = await Product.find()
    .sort({title: 'asc'})
                                //.select('title images price inStock slug _id')
                                .lean();

    await db.disconnect();

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOS_NAME}products/${ image }`
        });

        return product;
    })


    return res.status(200).json( updatedProducts );

}

const updateProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', images=[]} = req.body as IProduct;
    if(!isValidObjectId){
        return res.status(400).json( { message: 'Id producto no valido'} );
    }

    if(images.length < 2){
        return res.status(400).json( { message: 'minimo dos images'} );
    }

    // todo: localhost
    try{
        await db.connect();
        const product = await Product.findById(_id);
        if(!product){
            await db.disconnect();
            return res.status(400).json( { message: 'minimo dos images'} );
        }

        product.images.forEach( async(image) => {
            if(!images.includes(image)){
                const [ fileId, ext] = image.substring( image.lastIndexOf('/') + 1).split('.');
                await cloudinary.uploader.destroy(fileId);
            }
        })

        await product.update(req.body);
        await db.disconnect();
        return res.status(200).json( product );
    }catch(error){
        console.log(error);
        await db.disconnect();
        return res.status(400).json( { message: 'error en server'} );
    }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { images=[] } = req.body as IProduct;
    if(images.length < 2){
        return res.status(400).json( { message: 'minimo dos images'} );
    }

     // todo: localhost

    try{
        await db.connect();

        const pddb = await Product.findOne({slug: req.body.slug});
        if(pddb){
            await db.disconnect();
            return res.status(400).json( { message: 'Ya existe productox'} );
        }

        const product = new Product(req.body);
        await product.save();

        await db.disconnect();
        return res.status(200).json( product );
    }catch(error){
        console.log(error);
        await db.disconnect();
        return res.status(400).json( { message: 'error en server'} );
    }

}

