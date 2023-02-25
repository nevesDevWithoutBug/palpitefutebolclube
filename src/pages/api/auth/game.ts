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

            const { id, championshipId } = req.query

            let gameDb: any;
            
            if(championshipId) gameDb = await GameModel.getBychampionship(Number(championshipId))
            gameDb = await GameModel.get(Number(id))
            console.log('games:', gameDb)

            if(Array.isArray(gameDb)) {
                
                let manipuledGame: any[] = [] 

                gameDb.forEach((game:any)=>{

                    manipuledGame = [...manipuledGame, {
                        id: game.id,
                        name: game.name,
                        start: game.start,
                        championshipId: game.championshipId,
                        firstTeam: {
                            gol: game.teamsGame[0].gol,
                            ...game.teamsGame[0].team,
                        },
                        secondTeam: {
                            gol: game.teamsGame[1].gol,
                            ...game.teamsGame[1].team,
                        },
                        createdAt: game.createdAt,
                        updatedAt: game.updatedAt
                    }]

                })

                return res.status(200).json(manipuledGame)

            } else {
                let manipuledGame: any = {
                    id: gameDb.id,
                    name: gameDb.name,
                    start: gameDb.start,
                    championshipId: gameDb.championshipId,
                    firstTeam: {
                        id: gameDb.teamsGame[0].team.id,
                        name: gameDb.teamsGame[0].team.name,
                        gol: gameDb.teamsGame[0].gol,
                    },
                    secondTeam: {
                        id: gameDb.teamsGame[1].team.id,
                        name: gameDb.teamsGame[1].team.name,
                        gol: gameDb.teamsGame[1].gol,
                    },
                    createdAt: gameDb.createdAt,
                    updatedAt: gameDb.updatedAt
                }
                return res.status(200).json(manipuledGame)
            }

        }

        if(method === 'POST') {

            const { id, name, championshipId, firstTeam, secondTeam } = req.body

            const gameDb :GameType = await GameModel.upsert({id, name, championshipId})

            if(!gameDb) return res.status(500).json({ message: 'game not created' })

            const firstTeamDb : TeamsGameType = await TeamsGameModel.save({ teamId: firstTeam.id, gol: firstTeam.gol, gameId: gameDb.id  })
            const secondTeamDb : TeamsGameType = await TeamsGameModel.save({ teamId: secondTeam.id, gol: secondTeam.gol, gameId: gameDb.id  })

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