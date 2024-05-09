import React from 'react'
import useFetch from './useFetch'

export interface Location {
    name: string,
    coordinates: number[],
    id?: number,
}

const useLocations = () => useFetch<Location>('/locations')
  
export default useLocations
