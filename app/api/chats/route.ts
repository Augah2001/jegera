import { NextRequest, NextResponse } from "next/server";
import validate, { schemaLocation } from "../validate"; 
import prisma from '../../../prisma/client'
import { Location } from "@prisma/client";




export async function GET(request: NextRequest) {
  const chats = await prisma.chat.findMany({
    include: {users: true}
  });
  return NextResponse.json(chats);
}