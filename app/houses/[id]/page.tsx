'use client'
import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel';
import PictureView from './PictureView';
import ImageModal from './Modal';
import useHouses, { House } from '@/app/hooks/useHouses';
import apiClient from '@/app/configs/apiClient';



const Page = ({params: {id}}: {params: {id: string}}) => {

 const { isOpen, onClose, onOpen } = useDisclosure();
//  const {data: houses} = useHouses()
 const [house, setHouse] = useState<House>()

 useEffect(()=> {
    apiClient.get<House>(`/houses/${id}`)
    .then(res=> setHouse(res.data)).catch(err=> console.log(err))
 }, [id])


 



  return (
    <div className = 'flex px-3'>
      <SidePanel house={house}/>
      <div className="w-full" >
        <PictureView onOpen={onOpen} house = {house}  />
        <ImageModal onOpen={onOpen} house = {house}  onClose={onClose} isOpen={isOpen} />
        
        
      </div>
    </div>
  );
}

export default Page
