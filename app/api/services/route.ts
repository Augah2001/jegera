import { NextRequest, NextResponse } from "next/server";
import validate, { schemaService } from "../validate"; 
import prisma from '../../../prisma/client'
import { Service } from "@prisma/client"; 

export async function GET(request: NextRequest) {
  const services = await prisma.service.findMany({
    include: { houses: true }, 
  });
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateBody = validate(schemaService,body); // Perform validation

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  }

  const existingService = await prisma.service.findUnique({
    where: { name: body.name },
  });

  if (existingService) {
    return NextResponse.json({ error: "Service with this name already exists" }, { status: 400 });
  }

  const newService = await prisma.service.create<Service>({
    data: body,
    include: { houses: { connect: body.houses } }, // Connect related houses during creation
  });

  return NextResponse.json(newService);
}

// DELETE requests might not be suitable for a one-to-many relationship between Service and House.
// Consider implementing a DELETE endpoint for houses associated with a service if needed.

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10); // Extract ID from URL
  const body = await request.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
  }

  const validateBody = validate(schemaService,body); // Perform validation (optional, adjust as needed)

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  }

  const updatedService = await prisma.service.update({
    where: { id },
    data: body,
     // Connect and disconnect houses
  });

  if (!updatedService) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json(updatedService);
}
