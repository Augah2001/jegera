import React from 'react'

const GradientDiv = () => {
  return (
    <div className='flex  pt-0'>
        <div className=' bg-gradient-to-r from-transparent to-purple-600 w-full' style={{height: '2px',}}></div>
        <div className=' bg-gradient-to-r to-transparent from-purple-600 w-full' style={{height: '2px'}}></div>
        
    </div>
  )
}

export default GradientDiv