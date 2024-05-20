import { NextRequest, NextResponse } from "next/server";
import validate, { schemaLocation } from "../validate";
import prisma from "../../../prisma/client";
import { Location } from "@prisma/client";
import { Chat } from "@/app/HomeComponents/Chats";

export async function GET(request: NextRequest) {
  const chats = await prisma.chat.findMany({
    include: { users: true, messages: true },
  });

  chats.sort((a: Chat,b: Chat) => new Date(b.messages[b.messages.length-1]?.time) - b.messages[b.messages.length-1]?.time )
  console.log(chats)
  return NextResponse.json(chats);
}
