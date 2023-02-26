import { prisma } from "../db/prisma"
import { NewsType } from "../types/NewsType"

function model() {

    // export all function that is in the return
    return { 
        async get(id?: number) {
            return id ? <NewsType> await prisma.news.findFirst({ where: {id: id}, include : { author: true } }) 
            : <NewsType[]> await prisma.news.findMany({ include : { author: true } })
        },

        async upsert(news: NewsType) {
            return <NewsType> await prisma.news.upsert({
                where: { id: news.id ? news.id : -1},
                create: news,
                update: news,
                include : { author: true }
            })
        },

        async delete(id: number) {
            return <NewsType> await prisma.news.delete({ where: { id: id } })
        },

    }
    
}

const NewsModel = model()

export default NewsModel