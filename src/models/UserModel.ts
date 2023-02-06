import { prisma } from "../db/prisma"
import { UserType } from "../types/UserType"

function model() {

    // export all function that is in the return
    return { 
        async get(id?: number) {
            return id ? <UserType> await prisma.users.findFirst({ where: {id: id}}) 
            : <UserType[]> await prisma.users.findMany()
        },
    }
    
}

const UserModel = model()

export default UserModel