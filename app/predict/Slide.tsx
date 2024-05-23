'use client'
import { Box, FormLabel, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {
    sliderValue: number ,
    error: string | null,
    setSliderValue: React.Dispatch<React.SetStateAction<number>>
    setError: React.Dispatch<React.SetStateAction<string>>
}

const Slide = ({sliderValue, setSliderValue, error, setError }: Props) => {

    
  
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',

  }

  return (


      
      <Box p={4} pt={6} w = {'100%'}>
      <div className='flex justify-center mb-4'>
        <FormLabel className='font-medium text-2xl text-base-content' fontSize={'larger'}  >Minutes to UZ</FormLabel>
      </div>
        <Slider aria-label='slider-ex-6' min={0} max={120}  onChange={(val) => 
          {setSliderValue(val)}
        }>
          <SliderMark value={20} {...labelStyles} className='font-medium text-2xl text-base-content '>
            20 min
          </SliderMark>
          <SliderMark value={40} {...labelStyles} className='font-medium text-2xl text-base-content '>
            40 min
          </SliderMark>
          <SliderMark value={60} {...labelStyles} className='font-medium text-2xl text-base-content '>
            60 min
          </SliderMark>
          <SliderMark value={80} {...labelStyles} className='font-medium text-2xl text-base-content '>
            80 min
          </SliderMark>
          <SliderMark value={100} {...labelStyles} className='font-medium text-2xl text-base-content '>
            100 min
          </SliderMark>
      
          <SliderMark
            value={sliderValue}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
          >
            {sliderValue}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb  />
        </Slider>
        <div className='flex mt-3 justify-center'>{error && <p className="text-red-600 mx-4 mt-1 font-medium">{error}</p>}</div>
      </Box>
      
  
  )
}

export default Slide
