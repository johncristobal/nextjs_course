import { db } from "."
import { IProduct } from "../interfaces";
import { Product } from "../models";

export const getProductBySlug = async (slug: string):Promise<IProduct | null> => {

    await db.connect();
    const p = await Product.findOne({slug}).lean();
    await db.disconnect();

    if(!p){
        return null;
    }

    p.images = p.images.map( image => {
        return image.includes('http') ? image : `${process.env.HOS_NAME}products/${image}`
    })

    return JSON.parse(JSON.stringify(p));
}

interface ProductSlugs {
    slug: string;
}

export const getAlllProductsSlugs = async (): Promise<ProductSlugs[] | []> => {
 
    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}

export const getProductsTerm = async (term: string): Promise<IProduct[]> => {
 
    term = term.toString().toLowerCase();

    await db.connect();
    const ps = await Product.find({
        $text: {$search: term}
    })
    .select('title images price inStock slug -_id')
    .lean();

    const updated = ps.map(p => {
        p.images = p.images.map( image => {
            return image.includes('http') ? image : `${process.env.HOS_NAME}products/${image}`
        })

        return p;
    })

    await db.disconnect();

    return updated;
}

export const getAlllProducts = async (): Promise<IProduct[]> => {
 
    await db.connect();
    const ps = await Product.find().lean();
    await db.disconnect();

    const updated = ps.map(p => {
        p.images = p.images.map( image => {
            return image.includes('http') ? image : `${process.env.HOS_NAME}products/${image}`
        })

        return p;
    })

    return JSON.parse(JSON.stringify(updated));
}