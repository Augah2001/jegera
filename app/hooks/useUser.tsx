'use client'

import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

const useUser = () => {
  
    const {user, setUser} = useContext(UserContext)
    
  
    return {user, setUser}
  }


  export default useUser