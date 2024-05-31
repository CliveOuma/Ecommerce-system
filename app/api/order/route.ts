import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function PUT(request: Request){
  try {

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }
  const body = await request.json()
  const {id, deliveryStatus,} = body

  const order = await prisma.order.update({
    where: {id: id},
    data:{deliveryStatus}
  })
  

 return NextResponse.json(order);
} catch (error) {
  console.error('Updated product Successfully:', error);
  return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
}
}

