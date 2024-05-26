import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client";


export async function GET(request: NextRequest, {params: {id}}:{params: {id: string}}) {

    const user = await prisma?.user.findFirst({
        where: {id: parseInt(id)},
        
    })

    if (!user) return NextResponse.json({error: 'user not found'}, {status: 404})

    return NextResponse.json(user)    
}