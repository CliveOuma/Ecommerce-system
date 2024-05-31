import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { Review } from "@prisma/client"


export async function POST(request: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error
    }

    const body = await request.json()
    const {comment, rating,product, userId} = body;

    
    const review = await prisma?.review.create({
        data: {
            comment,
            rating,
            productId: product.id,
            userId
        }
    })

    return NextResponse.json(review)
}