import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, {params: {id}}:{params: {id: string}}) {

    const house = await prisma?.house.findFirst({
        where: {id: parseInt(id)},
        include: {services: true, location: true, owner: true}
    })

    if (!house) return NextResponse.json({error: 'house not found'}, {status: 404})

    return NextResponse.json(house)    
}