import { Location } from '@prisma/client'
import axios, { AxiosError, CanceledError } from 'axios'
import React, { useEffect, useState } from 'react'
import apiClient from '../configs/apiClient'

const useFetch =<T>(url:string,deps?:string[]) => {
  const [data, setData] = useState<T[]>([] as T[])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  useEffect(()=> {


    setIsLoading(true)
    const controller = new AbortController()
    apiClient.get<T[]>(url, {signal: controller.signal})
    .then(res => {
      setData(res.data)
      console.log(res.data)

    }).catch((err: AxiosError)=> {
      setError(err.message)
    })


    
    return () =>controller.abort()
    

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps?deps: [])


  return {data, error, isLoading}
    
}


export default useFetch
