// user.js
import { NextRequest, NextResponse } from "next/server";
import validate, { schemaUser } from "../validate"; // Assuming your validation function is in validate.js
import prisma from "../../../prisma/client";
import { User } from "@prisma/client"; // Import User and Transaction types
import bcrypt from "bcrypt";

function omitPassword(user: User) {
  const { password, ...userData } = user;
  return userData;
}


async function hash(password: string) {

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      authorizationKey: true,
      type: true,
      isOnline: true,
    },
  });
  const usersWithoutPassword = users.map(omitPassword); // Omit password before returning
  return NextResponse.json(usersWithoutPassword);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateBody = validate(schemaUser, body);

  if (!validateBody.success) {
    return NextResponse.json(
      { error: validateBody.error.errors },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );
  }

  const newUser = await prisma.user.create<User>({
    data: { ...body, password: hash(body.password) },
  });

  const userWithoutPassword = omitPassword(newUser);
  return NextResponse.json(userWithoutPassword);
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get("id") || "", 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const deletedUser = await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      authorizationKey: true,
      type: true,
      isOnline: true,
    },
  });

  if (!deletedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userWithoutPassword = omitPassword(deletedUser);
  return NextResponse.json(userWithoutPassword);
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get("id") || "", 10); // Extract ID from URL
  const body = await request.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const validateBody = validate(schemaUser, body);

  if (!validateBody.success) {
    return NextResponse.json(
      { error: validateBody.error.errors },
      { status: 400 }
    );
  }

  let updatedData = body;
  if (body.password) {
    updatedData = { ...body, password: hash(body.password) };
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updatedData,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      authorizationKey: true,
      type: true,
      isOnline: true,
    },
  });

  if (!updatedUser) {
    return NextResponse.json({ error: "House not found" }, { status: 404 });
  }

  return NextResponse.json(updatedUser);
}
