import { prisma } from "../db/prisma"
import { UserType } from "../types/UserType"

function model() {

    // export all function that is in the return
    return { 
        async get(id?: number) {
            return id ? <UserType> await prisma.users.findFirst({ where: {id: id}}) 
            : <UserType[]> await prisma.users.findMany()
        },

        async create(user: UserType) {
            return await prisma.users.create({
                data: user
            })
        },

        async update(user: { email: string, name: string, document: string, team: string, info: string, number: string, birthday: string }) {
            return await prisma.users.update({
                where: { email: user.email },
                data: {
                    name: user.name ? user.name : undefined,
                    document: user.document ? user.document : undefined,
                    team: user.team ? user.team : undefined,
                    info: user.info ? user.info : undefined,
                    number: user.number ? user.number : undefined,
                    birthday: user.birthday ? user.birthday : undefined,
                }
            })
        },


    }
    
    
}

const UserModel = model()

export default UserModel