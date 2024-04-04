import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

const Main = ({text}: {text: string}) => {
    const {isDark} = useContext(ThemeContext)
  return (
    <div className='flex mb-3'>
        <div ><h1 className={`${isDark? 'text-slate-100': 'text-gray-700'} 'font-xl `}>{`${text} `}{" "}</h1></div>
        <div className='flex items-center'>
            <div className='w-[2px] ms-3 h-[20px] bg-slate-400'></div>
        </div>
    </div>
  )
}

export default Main