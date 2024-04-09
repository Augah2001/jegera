import { NextRequest, NextResponse } from "next/server";
import validate from "./validate"; // Assuming your validation function is in validate.js
import prisma from '../../../prisma/client'
import { Transaction, User } from "@prisma/client"; // Import Transaction and User types

export async function GET(request: NextRequest) {
  const transactions = await prisma.transaction.findMany({
    include: { sender: true, receiver: true }, // Include related User data
  });
  return NextResponse.json(transactions);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateBody = validate(body); // Perform validation

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

  const newTransaction = await prisma.transaction.create<Transaction>({
    data: body,
    include: { sender: true, receiver: true }, // Include related User data upon creation
  });

  return NextResponse.json(newTransaction);
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

// PUT requests might not be suitable for transactions as they represent a point-in-time event.
// Consider using a separate endpoint for updates if needed (e.g., refunds).
