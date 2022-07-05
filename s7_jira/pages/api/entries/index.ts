import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { EntryModel, IEntry } from '../../../models'
import { NewEntry } from '../../../components/ui/NewEntry';

type Data = 
| { msg: string }
| IEntry[]
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getEntries(res)
        case 'POST':
            return postEntry(req, res);

        default:
            return res.status(200).json({ msg: 'End no valido' })
    }
}

const getEntries = async (res: NextApiResponse<Data> ) => {
    await db.connect();
    const entries = await EntryModel.find().sort({ createdAt: 'ascending'})
    await db.disconnect();
    return res.status(200).json(entries);
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { description = '' } = req.body;

    const newEntry = new EntryModel({
        description,
        createdAt: Date.now()
    });

    try{
        await db.connect();
        await newEntry.save()
        await db.disconnect();

        return res.status(201).json(newEntry);
    } catch(error){
        await db.disconnect();
        console.log(error);
        return res.status(500).json({msg: "Error servidor..."});
    }   
}
