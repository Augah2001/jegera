import { NextRequest, NextResponse } from "next/server"



export async function GET(request: NextRequest, {params: {authorizationKey}}:{params: {authorizationKey: string}}) {

    const houseAuth = await prisma?.houseAuth.findFirst({
        where: {authorizationKey: authorizationKey},
        
    })

    if (!houseAuth) return NextResponse.json({error: 'houseAuth not found'}, {status: 404})

    return NextResponse.json(houseAuth)    
}

export async function DELETE(request: NextRequest, {params: {authorizationKey}}:{params: {authorizationKey: string}}) {
    const myId = authorizationKey
  
    

    const houseAuth = await prisma?.houseAuth.findFirst({
      where: { authorizationKey: myId },
     
    })

    if (!houseAuth) {
      return NextResponse.json({ error: "houseAuth not found" }, { status: 404 })
    }
  
    const deletedHouseAuth = await prisma?.houseAuth.delete({
      where: { authorizationKey: myId },
 
    });
  
    if (!deletedHouseAuth) {
      return NextResponse.json({ error: "houseAuth not found" }, { status: 404 });
    }
  
    return NextResponse.json(deletedHouseAuth);
  }