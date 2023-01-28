import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<Object>) {

    return res.status(200).json({ teste: 'teste' })

}