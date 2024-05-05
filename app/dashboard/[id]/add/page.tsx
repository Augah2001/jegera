'use client'
import React, { useContext, useEffect, useState } from 'react'
import AddForm from '../AddForm'
import Modal from '@/app/components/Modal'
import { FormModalContext } from '@/app/contexts/FormModalContext'
import MyMap from '@/app/HomeComponents/Map'

const Page = () => {
    const [_, setHasScrolled] = useState(false)

    const { onOpen } = useContext(FormModalContext)
    
  return (
    <div className='flex justify-center w-[100%]'>
        < Modal modalBody = {<MyMap setHasScrolled={setHasScrolled} options={{marker: false, directions: false, search: true}}/>}/>
      <div className=''>
      
          <AddForm />
      </div>
    </div>
  )
}

export default Page
