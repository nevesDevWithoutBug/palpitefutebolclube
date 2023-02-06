import { prisma } from "../db/prisma"
import { TeamsGameType } from "../types/TeamsGameType"

function model() {

    // export all function that is in the return
    return { 
        async get(id?: number) {
            return id ? <TeamsGameType> await prisma.teamsGame.findFirst({ where: {id: id} }) 
            : <TeamsGameType[]> await prisma.teamsGame.findMany()
        },

        async upsert(teamsGame: TeamsGameType) {
            return <TeamsGameType> await prisma.teamsGame.upsert({
                where: { id: teamsGame.id ? teamsGame.id : -1},
                create: teamsGame,
                update: teamsGame,
            })
        },

        async delete(id: number) {
            return <TeamsGameType> await prisma.teamsGame.delete({ where: { id: id } })
        },

    }
    
}

const TeamsGameModel = model()

export default TeamsGameModel