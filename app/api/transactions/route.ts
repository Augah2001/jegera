import { NextRequest, NextResponse } from "next/server";
import validate, { schemaTransaction } from "../validate"; // Assuming your validation function is in validate.js
import prisma from '../../../prisma/client'
import { House, Transaction } from "@prisma/client"; // Import Transaction and User types

export async function GET(request: NextRequest) {
  const transactions = await prisma.transaction.findMany({
    include: { sender: true, receiver: true }, // Include related User data
  });
  return NextResponse.json(transactions);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateBody = validate(schemaTransaction, body) // Perform validation

  

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  }

  

  // Check if sender and receiver users exist (optional, adjust as needed)
  const sender = await prisma.user.findUnique({
    where: { id: body.senderId },
  });
  if (!sender) {
    return NextResponse.json({ error: "Sender user not found" }, { status: 400 });
  }

  const receiver = await prisma.user.findUnique({
    where: { id: body.receiverId },
  });
  if (!receiver) {
    return NextResponse.json({ error: "Receiver user not found" }, { status: 400 });
  }
  const house = await prisma.house.findUnique<House>({
    where: { id: body.houseId },
  });
  if (!house) {
    return NextResponse.json({ error: "House user not found" }, { status: 400 });
  }

  if (house.occupied >= house.capacity) return NextResponse.json({error: "house is full"}, {status: 500})
  try {
    const[transaction,updatedHouse] = await prisma.$transaction([
      prisma.transaction.create<Transaction>({
        data: body,
        include: { sender: true, receiver: true, house: true }, // Include related User data upon creation
      }),
      prisma.house.update({
        where: {id:house.id}, data: {occupied: house.occupied + 1}
      })
    ])
   
    return NextResponse.json({transaction, updatedHouse});
  } catch (err) {
    console.log(err)
    return NextResponse.json({error: "failed to transact"});

  }

}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10); // Extract ID from URL

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid transaction ID" }, { status: 400 });
  }

  const deletedTransaction = await prisma.transaction.delete({
    where: { id },
    include: { sender: true, receiver: true }, // Include related User data upon deletion
  });

  if (!deletedTransaction) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  return NextResponse.json(deletedTransaction);
}

