import { NextRequest, NextResponse } from "next/server";
import cloudinary from 'cloudinary'
import validate, { schemaPublicId } from "../validate";


cloudinary.v2.config(
{cloud_name: "dthwbq2mh",
 api_key: '358758514275342',
 api_secret: 'LxL4OsNuaawKIJUYOBEx1wok8Rw'

}
)





export async function POST(request: NextRequest) {

    const body = await request.json();
    
  const validateBody = validate(schemaPublicId, body); // Perform validation

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  }
  
    try {
        const response = await cloudinary.v2.uploader.destroy(body.publicId);
        console.log('Deletion result:', response); 
        if (response.result === 'not found') {
          return NextResponse.json({ message: 'not found', value: false }, { status: 404 });
        }
        return NextResponse.json({ message: "deleted", value: true });
      } catch (error) {
        console.error('Deletion failed:', error);
        return NextResponse.json({ message: 'failed', value: false }, { status: 500 });
      }
    
  }
  