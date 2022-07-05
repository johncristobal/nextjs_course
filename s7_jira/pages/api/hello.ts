// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string;
  message: string;
  method: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log(process.env.URL_CONN)
  res.status(200).json(
    {
      name: 'John Doe',
      message: 'Todo ok',
      method: req.method || 'Sin metodo'
    }
  )
}
