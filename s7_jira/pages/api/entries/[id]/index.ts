import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../../database';
import { EntryModel } from '../../../../models';
import { IEntry } from '../../../../models/Entry';

type Data = 
| { msg: string }
| IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query
    
    if ( !mongoose.isValidObjectId( id )){
        return res.status(400).json({
            msg: 'Id no valido'
        })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req,res);
        case 'GET':
            return getEntry(req,res);
        
        default:
            return res.status(400).json({ msg: 'bad request' })
    }   
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data> ) => {

    try{
        const { id } = req.query
        await db.connect();

        const updateEntry = await EntryModel.findById( id );

        if (!updateEntry){
            await db.disconnect();
            return res.status(400).json({ msg: 'No hay entrada con el ID' })
        }
        
        const { 
            description = updateEntry.description, 
            status = updateEntry.status
        } = req.body

        const updatedEntry = await EntryModel.findByIdAndUpdate( id, 
            { description, status },
            {runValidators: true, new: true}
        )
        
        await db.disconnect();
        return res.status(201).json(updatedEntry!);
    } catch(error: any){
        await db.disconnect();
        console.log(error);
        return res.status(500).json({msg: error.errors.status.message});
    }   
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data> ) => {

    try{
        const { id } = req.query
        await db.connect();

        const updateEntry = await EntryModel.findById( id );

        if (!updateEntry){
            await db.disconnect();
            return res.status(400).json({ msg: 'No hay entrada con el ID' })
        }
        
        await db.disconnect();
        return res.status(200).json(updateEntry!);
    } catch(error: any){
        await db.disconnect();
        console.log(error);
        return res.status(500).json({msg: error.errors.status.message});
    }   
}
