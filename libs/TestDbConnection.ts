import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testConnection() {
    try {
        const user = await prisma.user.findFirst();
        console.log('Database connection successful', user);
    } catch (error) {
        console.error('Database connection failed', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
