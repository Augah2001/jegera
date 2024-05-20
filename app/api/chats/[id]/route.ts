import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { Chat } from "@/app/HomeComponents/Chats";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: { id: parseInt(id) },
      },
    },
    include: { users: true, messages: true },
  });

  chats.sort(
    (a: Chat, b: Chat) =>
      new Date(b.messages[b.messages.length - 1]?.time) -
      a.messages[a.messages.length - 1]?.time
  );
  console.log(chats);

  return NextResponse.json(chats);
}
