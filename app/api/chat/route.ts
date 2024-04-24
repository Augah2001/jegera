import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import cors from "cors";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router
  // A middleware example
  .use(async (req, event, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .get((req) => {
    const id = 1
    const user = {name: 'augustine'}
    return NextResponse.json({ user });
  })
 
export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}