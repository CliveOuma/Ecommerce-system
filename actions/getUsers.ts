import prisma from '@/libs/prismadb'

export default async function getUser(){
    try {
        const users = await prisma.user.findMany()

        return users
    }catch (error: any){
        throw new Error(error)
    }
}