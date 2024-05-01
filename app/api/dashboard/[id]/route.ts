import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import validate, { schemaHouse } from "../../validate";
import prisma from "@/prisma/client";


interface Args {
    params: {id: number}
}

export async function GET(request:NextRequest,{params: {id}}: Args) {
    

    

    const houses = await prisma?.house.findMany({
        where: {ownerId: id}
    })

    

   
    return NextResponse.json(houses)
}


export async function PUT(request: NextRequest, {params: {id}}:Args) {
-
    const body = request.json()

    const validateBody = validate(schemaHouse, body)

    if (!validateBody.success) return  NextResponse.json({error: validateBody.error.errors}, {status:400})

    const house = await prisma.house.findUnique({
        where: {id: id}
    })

    
}