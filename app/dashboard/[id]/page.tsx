'use client'

import { UserContext } from '@/app/contexts/UserContext'
import SearchComponent from '@/app/HomeComponents/SearchComponent'
import Slider from '@/app/HomeComponents/Slider'
import useLocations from '@/app/hooks/useLocations'
import React, { useContext, useEffect } from 'react'

const Dashboard
 = () => {

  const {data:locations, error, isLoading} = useLocations()

  return (
    <div className=' py-8'>
      <p className='font-medium mx-6 mb-8 text-slate-400 text-4xl'>Dashboard</p >
      <Slider locations={locations} />    
    </div>
  )
}

export default Dashboard

