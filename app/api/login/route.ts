import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { use } from 'react';
import prisma from "../../../prisma/client";



const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

function omitCrucial(user: User) {
    delete user["authorizationKey"];
    delete user["password"];
  
    return user;
  }

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Parse request body as JSON
    const body = await req.json();

    // Validate request body using Zod schema
    const validateBody = loginSchema.safeParse(body);
    if (!validateBody.success) {
      return NextResponse.json({ error: validateBody.error.errors } , {status: 400});
    }

    // Extract email and password from validated body
    const { email, password } = validateBody.data;

    // Find user by email using Prisma
    const user = await prisma.user.findUnique<User>({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, {status: 400});
    }

    // Validate password using bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, {status: 400});
    }

    // Create user response with relevant data (excluding sensitive fields)
    const userWithoutPassword= omitCrucial(user)

    // Generate JWT token with user information (exclude sensitive data)
    const token = jwt.sign(userWithoutPassword, 'authKey');

    const response = NextResponse.json(userWithoutPassword);
    response.headers.set("x-auth-token", token);
    // Send login response with user data and token
    return response
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'internal server error' }, {status: 500});
  }
}
