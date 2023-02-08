import type { NextApiRequest, NextApiResponse } from 'next'
import ChampionshipModel from 'src/models/ChampionshipModel';
import { authorizationToken, verify } from 'src/providers/http/jwt';
import { ChampionshipType } from 'src/types/ChampionshipType';

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

            const championshipDb :ChampionshipType | ChampionshipType[] = await ChampionshipModel.get(Number(id))

            if(!championshipDb) return res.status(404).json({ message: 'championship not found' })

            return res.status(200).json(championshipDb)

        }

        if(method === 'POST') {

            const { championship } : { championship:ChampionshipType } = req.body

            const championshipDb :ChampionshipType = await ChampionshipModel.upsert(championship)

            if(!championshipDb) return res.status(500).json({ message: 'championship not created' })

            return res.status(200).json(championshipDb)

        }

        if(method === 'DELETE') {

            const { id } = req.query

            if(!id) return res.status(406).json({ message: 'missing params' })

            const championshipDb :ChampionshipType = await ChampionshipModel.delete(Number(id))

            if(!championshipDb) return res.status(500).json({ message: 'championship not deleted' })

            return res.status(200).json(championshipDb)

        }
        
        
    } catch(error) {

        console.error(error)
        return res.status(500).json({ message: error })
        
    }
    
}