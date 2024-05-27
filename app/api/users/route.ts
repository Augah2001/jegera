// user.js
import { NextRequest, NextResponse } from "next/server";
import validate, { schemaUser } from "../validate"; // Assuming your validation function is in validate.js
import prisma from "../../../prisma/client";
import { User } from "@prisma/client"; // Import User and Transaction types
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function omitCrucial(user: User) {
  delete user["authorizationKey"];
  delete user["password"];

  return user;
}

async function hash(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany<User>({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      // authorizationKey: true,
      accountType: true,
      isOnline: true,
    },
  });
  const usersWithoutPassword = users.map(omitCrucial);
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

  if (body.accountType === 'landlord') {
    const authKey = await prisma.user.findUnique({
      where: {authorizationKey: body.authorizationKey}
    })
  
    if (authKey) return NextResponse.json({error: 'authorization key already taken'}, {status: 400})
  }

  

  const existingUser = await prisma.user.findUnique<User>({
    where: { email: body.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const newUser = await prisma.user.create<User>({
    data: { ...body, password: hashedPassword },
  });

  const userWithoutPassword = omitCrucial(newUser);

  const token = jwt.sign(newUser, "authKey");

  const response = NextResponse.json(userWithoutPassword);
  response.headers.set("x-auth-token", token);

  return response;
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

  const userWithoutPassword = omitCrucial(deletedUser);
  return NextResponse.json(userWithoutPassword);
}
