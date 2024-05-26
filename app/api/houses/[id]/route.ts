
import { NextRequest, NextResponse } from "next/server";
import validate, { schemaHouse } from "../../validate";
import prisma from "../../../../prisma/client";


export async function GET(request: NextRequest, {params: {id}}:{params: {id: string}}) {

    const house = await prisma?.house.findFirst({
        where: {id: parseInt(id)},
        include: {services: true, location: true, owner: true}
    })

    if (!house) return NextResponse.json({error: 'house not found'}, {status: 404})

    return NextResponse.json(house)    
}

export async function DELETE(request: NextRequest, {params: {id}}:{params: {id: string}}) {
    const myId = parseInt(id)
  
    if (isNaN(myId)) {
      return NextResponse.json({ error: "Invalid house ID" }, { status: 400 });
    }

    const house = await prisma?.house.findFirst({
      where: { id: myId },
      include: { location: true },
    })

    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 })
    }
  
    const deletedHouse = await prisma?.house.delete({
      where: { id: myId },
      include: { location: true }, 
    });
  
    if (!deletedHouse) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }
  
    return NextResponse.json(deletedHouse);
  }


  export async function PUT(request: NextRequest, {params: {id}}:{params: {id: string}} ) {
    
    
    const body = await request.json();
  
    if (isNaN(parseInt(id))) {
      return NextResponse.json({ error: "Invalid house ID" }, { status: 400 });
    }
  
    const validateBody = validate(schemaHouse, body); 
  
    if (!validateBody.success) {
      return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
    }
  
    const updatedHouse = await prisma?.house.update({
      where: { id: parseInt(id) },
      data: {...body, services: { connect: body.services} },
      include: { location: true, services: true }
    });
  
    if (!updatedHouse) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }
  
    return NextResponse.json(updatedHouse);
  }