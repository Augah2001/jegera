import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../prisma/client'


export async function GET(request: NextRequest,{params: {id}}:  {params: {id: string}}) {


    const chats = await prisma.chat.findMany({
        where: {
            users: {
                some: {id: 3}
            }
        }, include: {users: true}
    })

    return NextResponse.json(chats)

}