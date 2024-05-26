import { NextRequest, NextResponse } from "next/server";
import validate, { schemaLocation } from "../validate";
import prisma from "../../../prisma/client";
import { Location } from "@prisma/client";
import { Chat } from "@/app/HomeComponents/Chats";

export async function GET(request: NextRequest) {
  const chats = await prisma.chat.findMany({
    include: { users: true, messages: true },
  });

  chats.sort((a: Chat, b: Chat) => {
    const timeA = a.messages[a.messages.length - 1]?.time;
    const timeB = b.messages[a.messages.length - 1]?.time;
  
    // Handle cases where either time might be null
    if (!timeA && !timeB) {
      return 0; // Sort equal if both times are null
    } else if (!timeA) {
      return 1; // Sort b before a if only a's time is null
    } else if (!timeB) {
      return -1; // Sort a before b if only b's time is null
    }
  
    return new Date(timeB).getTime() - new Date(timeA).getTime();
  });
  return NextResponse.json(chats);
}
