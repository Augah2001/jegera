import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";


export async function GET(request: NextRequest, {params: {id}}:{params: {id: string}}) {

    const location = await prisma?.location.findFirst({
        where: {id: parseInt(id)},
    
    })

    if (!location) return NextResponse.json({error: 'location not found'}, {status: 404})

    return NextResponse.json(location)    
}