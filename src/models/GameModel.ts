import { prisma } from "../db/prisma"
import { GameType } from "../types/GameType"

function model() {

    // export all function that is in the return
    return { 
        async get(id?: number) {
            return id ? <GameType> await prisma.games.findFirst({
              where: {id: id},
              include: { 
                teamsGame: { include: { team: true },} 
              }
            }) : <Array<GameType>> await prisma.games.findMany({
              include: { 
                teamsGame: { include: { team: true } } 
              }
            })
          },

        async upsert(game: GameType) {
            return <GameType> await prisma.games.upsert({
                where: { id: game.id ? game.id : -1},
                create: game,
                update: game,
                include: { teamsGame: true}
            })
        },

        async delete(id: number) {
            return <GameType> await prisma.games.delete({ where: { id: id } })
        },

    }
    
}

const GameModel = model()

export default GameModel