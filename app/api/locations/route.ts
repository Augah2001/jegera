import { NextRequest, NextResponse } from "next/server";
import validate, { schemaLocation } from "../validate"; 
import prisma from '../../../prisma/client'
import { Location } from "@prisma/client";

export async function GET(request: NextRequest) {
  const locations = await prisma.location.findMany();
  return NextResponse.json(locations);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateBody = validate(schemaLocation,body); 

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  
  }

  const existingLocation = await prisma.location.findUnique({
    where: { name: body.name },
  });

  if (existingLocation) {
    return NextResponse.json({ error: "Location with this name already exists" }, { status: 400 });
  }
  

  const newLocation = await prisma.location.create<Location>({
    data: {...body},
  });

  return NextResponse.json(newLocation);
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10); 

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid location ID" }, { status: 400 });
  }

  const deletedLocation = await prisma.location.delete({
    where: { id },
  });

  if (!deletedLocation) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Location deleted successfully" });
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10); 
  const body = await request.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid location ID" }, { status: 400 });
  }

  const validateBody = validate(schemaLocation,body); 

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  }

  const updatedLocation = await prisma.location.update({
    where: { id },
    data: body, 
  });

  if (!updatedLocation) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  }

  return NextResponse.json(updatedLocation);
}
