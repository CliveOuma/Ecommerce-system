import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';


export async function DELETE(request:Request, {params}: { params: {id: string}}){
    try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.error();
      }
    
      const product = await prisma?.product.delete({
        where: {id: params.id},
      })
      
    
     return NextResponse.json(product);
    } catch (error) {
      console.error('deleted product Successfully:', error);
      return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
    }