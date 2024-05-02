import React from 'react'
import useFetch from './useFetch'
import { User } from '../contexts/UserContext'



const useUsers =  () => useFetch<User[]>('/users')
 

export default useUsers
