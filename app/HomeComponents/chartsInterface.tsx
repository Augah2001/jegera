import React from 'react'
import PredictChart from '../dashboard/PredictChart'
import { House } from '../hooks/useHouses'
import CapacityChart from '../dashboard/CapacityChart'
import RentCharts from '../dashboard/Rent'
import TenantChart from '../dashboard/TenantChart'

const chartsInterface = ({houses}: {houses: House[] | undefined}) => {
    
  return (
    <div className=' fixed z-50 min-h-[800px] min-w-[800px] bg-base-200 rounded-2xl shadow-lg  '>
      <div className=' grid grid-cols-2 gap-3 '>
          <PredictChart houses={houses}/>
          <RentCharts houses={houses}/>
          <CapacityChart houses={houses}/>
          <TenantChart houses={houses}/>
      </div>
      
    </div>
  )
}

export default chartsInterface
