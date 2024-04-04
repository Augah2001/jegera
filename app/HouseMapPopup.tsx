'use client'

import React from 'react'
import Image from 'next/image'
import dheni from "./assets/dheni.jpg";
import { useRouter } from 'next/navigation';


const HouseMapPopup = () => {

  
  return (
    <div className=" card rounded-none w-[100%] mb-4 max-h-[10px]] mx-0  "
    onClick={() => {
     
    }}
    >
      <figure className=" bg-bse-200  max-h-[180px] ">
        <Image
          
          src={dheni}
          
          alt="thumbnail"
          objectPosition="center"
          layout="fit" // Use layout="fill" for responsive sizing
          objectFit="cover" // Use objectFit="cover" to crop if needed
          className="object-cover h-[60%] object-center mx-0" // Add Tailwind class for object-fit
          priority // Prioritize loading this image for a better experience
          
        />
        
      </figure>
      <div className="card-body p-2 m- h-[full]">
        <div className='flex'>
            <h2 className="card-title text-purple-700">Amenities</h2>
        </div>
        <p className='text-gray-500'>gas | wifi | shelves | 3 per/room | stove | gyser | solar | meals | beds | no curfew </p>

      </div>
      
    </div>
  )
}

export default HouseMapPopup