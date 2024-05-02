'use client'

import { UserContext } from '@/app/contexts/UserContext'
import SearchComponent from '@/app/HomeComponents/SearchComponent'
import Slider from '@/app/HomeComponents/Slider'
import React, { useContext, useEffect } from 'react'

const Dashboard
 = () => {

  useEffect(() => {

  
  }, [])

  return (
    <div className=' py-8'>
      <p className='font-medium mx-6 mb-8 text-slate-400 text-4xl'>Dashboard</p >
      {/* <Slider />     */}
    </div>
  )
}

export default Dashboard

