import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.error();
    }

    const body = await request.json();
    const { name, description, price, brand, category, inStock, images } = body;

    // Validate input data
    if (!name || !description || !price || !brand || !category || !images || images.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create new product in the database
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        inStock,
        images: { set: images.map((img:any) => ({ image: img })) },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request){
  try {

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }
  const body = await request.json()
  const {id, inStock,} = body

  const product = await prisma.product.update({
    where: {id: id},
    data:{inStock}
  })
  

 return NextResponse.json(product);
} catch (error) {
  console.error('Updated product Successfully:', error);
  return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
}
}

