import type { NextApiRequest, NextApiResponse } from 'next'
import GameModel from 'src/models/GameModel';
import TeamsGameModel from 'src/models/TeamsGameModel';
import { GameType } from 'src/types/GameType';
import { TeamsGameType } from 'src/types/TeamsGameType';

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

            const { id, name, championshipId, firstTeam, secondTeam } = req.body

            const gameDb :GameType = await GameModel.upsert({id, name, championshipId})

            if(!gameDb) return res.status(500).json({ message: 'game not created' })

            const firstTeamDb : TeamsGameType = await TeamsGameModel.upsert({ teamId: firstTeam.id, gol: firstTeam.gol, gameId: gameDb.id  })
            const secondTeamDb : TeamsGameType = await TeamsGameModel.upsert({ teamId: secondTeam.id, gol: secondTeam.gol, gameId: gameDb.id  })

            return res.status(200).json( await GameModel.get(gameDb.id) )

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