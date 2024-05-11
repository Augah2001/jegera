import React from 'react'
import useFetch from './useFetch'

export interface Service {
    name: string,

}

const useServices
 = () => useFetch<Service>('/services')
  
export default useServices
