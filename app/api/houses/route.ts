import { NextRequest, NextResponse } from "next/server";
import validate, { schemaHouse } from "../validate"; // Assuming your validation function is in validate.js
import prisma from '../../../prisma/client'
import { House } from "@prisma/client"; // Import House and Location types

export async function GET(request: NextRequest) {
  const houses = await prisma.house.findMany({
    include: { location: true }, // Include related Location data
  });
  return NextResponse.json(houses);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateBody = validate(schemaHouse, body); // Perform validation

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  }

  const existingHouse = await prisma.house.findMany({
    where: { houseNumber: body.houseNumber, locationId: body.locationId },
  });

  if (existingHouse) {
    return NextResponse.json({ error: "House with this number and location already exists" }, { status: 400 });
  }

  const newHouse = await prisma.house.create<House>({
    data: body,
    include: { location: true }, // Include related Location data upon creation
  });

  return NextResponse.json({message: "helo"});
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10); // Extract ID from URL

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid house ID" }, { status: 400 });
  }

  const deletedHouse = await prisma.house.delete({
    where: { id },
    include: { location: true }, // Include related Location data upon deletion
  });

  if (!deletedHouse) {
    return NextResponse.json({ error: "House not found" }, { status: 404 });
  }

  return NextResponse.json(deletedHouse);
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10); // Extract ID from URL
  const body = await request.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid house ID" }, { status: 400 });
  }

  const validateBody = validate(schemaHouse, body); // Perform validation (optional, adjust as needed)

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  }

  const updatedHouse = await prisma.house.update({
    where: { id },
    data: body,
    include: { location: true }, // Include related Location data upon update
  });

  if (!updatedHouse) {
    return NextResponse.json({ error: "House not found" }, { status: 404 });
  }

  return NextResponse.json(updatedHouse);
}
