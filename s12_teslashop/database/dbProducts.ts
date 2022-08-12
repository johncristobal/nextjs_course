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