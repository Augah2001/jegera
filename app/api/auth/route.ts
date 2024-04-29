import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";

import validate from "../validate";

const authSchema = z.object({
  authorizationKey: z.string(),
});

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

    const { authorizationKey } = body;
 

    const authorizedUser = await prisma.auth.findUnique({
      where: {authorizationKey: authorizationKey },
    });

    if (!authorizedUser) {
      return NextResponse.json(
        { error: "Invalid authorization key" },
        { status: 401 }
      );
    }

    return NextResponse.json(true); // Replace with desired response data
  } catch (error) {
    console.error("Error in POST /api/auth:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
