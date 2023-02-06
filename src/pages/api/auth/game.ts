import type { NextApiRequest, NextApiResponse } from 'next'
import GameModel from 'src/models/GameModel';
import { GameType } from 'src/types/GameType';

// 200 OK
// 201 Created
// 202 Accepted
// 203 Non-Authoritative Information
// 204 No Content
// 205 Reset Content
// 206 Partial Content

// 400 Bad Request
// 401 Unauthorized
// 402 Payment Required
// 403 Forbidden
// 404 Not Found
// 405 Method Not Allowed
// 406 Not Acceptable
// 429 Too Many Requests
// 500 Internal Server Error
// 501 Not Implemented
// 502 Bad Gateway
// 503 Service Unavailable

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    
    try {
    
        const { method } = req

        if(method === 'GET') {

            const { id } = req.query

            const gameDb :GameType | GameType[] = await GameModel.get(Number(id))

            if(!gameDb) return res.status(404).json({ message: 'game not found' })

            return res.status(200).json(gameDb)

        }

        if(method === 'POST') {

            const { game } : { game:GameType } = req.body

            const gameDb :GameType = await GameModel.upsert(game)

            if(!gameDb) return res.status(500).json({ message: 'game not created' })

            return res.status(200).json(gameDb)

        }

        if(method === 'DELETE') {

            const { id } = req.query

            if(!id) return res.status(406).json({ message: 'missing params' })

            const gameDb :GameType = await GameModel.delete(Number(id))

            if(!gameDb) return res.status(500).json({ message: 'game not deleted' })

            return res.status(200).json(gameDb)

        }
        
        
    } catch(error) {

        console.error(error)
        return res.status(500).json({ message: error })
        
    }
    
}