import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";

import validate from "../validate";

const authSchema = z.object({
  authorizationKey: z.string(),
  fullName: z.string()

});

export async function GET(request: NextRequest) {
  const houseAuths = await prisma.houseAuth.findMany({
  });
  return NextResponse.json(houseAuths);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    const validateBody = validate(authSchema, body);

    if (!validateBody.success) {
      return NextResponse.json(
        { error: validateBody.error.errors },
        { status: 400 }
      );
    }

    const auth = await prisma.houseAuth.create({
      data: body
    })


    
 


    return NextResponse.json(auth); // Replace with desired response data
  } catch (error) {
    console.error("Error in POST /api/auth:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
