import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database';
import { EntryModel } from '../../models';
import { seedData } from '../../database/seed-data';

type Data = {
    msg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production'){
        return res.status(401).json({ msg: 'No tiene acceso al servicio' })
    }

    await db.connect();

    await EntryModel.deleteMany();
    await EntryModel.insertMany(seedData.entries);

    await db.disconnect();
    res.status(200).json({ msg: 'Proceso ok' })
}