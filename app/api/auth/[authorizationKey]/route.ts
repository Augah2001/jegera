import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, {params: {authorizationKey}}:{params: {authorizationKey: string}}) {
    const myId = authorizationKey
  
    

    const auth = await prisma?.auth.findFirst({
      where: { authorizationKey: myId },
     
    })

    if (!auth) {
      return NextResponse.json({ error: "auth not found" }, { status: 404 })
    }
  
    const deletedAuth = await prisma?.auth.delete({
      where: { authorizationKey: myId },
 
    });
  
    if (!deletedAuth) {
      return NextResponse.json({ error: "auth not found" }, { status: 404 });
    }
  
    return NextResponse.json(deletedAuth);
  }