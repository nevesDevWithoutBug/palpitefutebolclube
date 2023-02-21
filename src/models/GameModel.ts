import { prisma } from "../db/prisma"
import { GameType } from "../types/GameType"

function model() {

    // export all function that is in the return
    return { 

      async getBychampionship(id: number) {
        return <GameType[]> await prisma.games.findMany({ where: {championshipId: id},include: { teamsGame: { include: { team: true },}  }})
      },
      async get(id?: number) {
        return id ? <GameType> await prisma.games.findFirst({ where: {id: id}, include: {   teamsGame: { include: { team: true },} } })
        : <GameType[]> await prisma.games.findMany({ include: {  teamsGame: { include: { team: true } } } })
        },

      async upsert(game: GameType) {
        return <GameType> await prisma.games.upsert({
          where: { id: game.id ? game.id : -1},
          create: { name: game.name, championshipId: Number(game.championshipId) },
          update: { name: game.name },
          include: { teamsGame: true}
        })
      },

      async delete(id: number) {
        await prisma.teamsGame.deleteMany({ where: { gameId: id } })
        return <GameType> await prisma.games.delete({ where: { id: id } })
      },

    }
    
}

const GameModel = model()

export default GameModel