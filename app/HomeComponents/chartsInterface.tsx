import React from "react";
import PredictChart from "../dashboard/PredictChart";
import { House } from "../hooks/useHouses";
import CapacityChart from "../dashboard/CapacityChart";
import RentCharts from "../dashboard/Rent";
import TenantChart from "../dashboard/TenantChart";
import { BiMinus } from "react-icons/bi";
import { useResponsive } from "../hooks/useResponsive";

interface Props {
  setShowCharts: React.Dispatch<React.SetStateAction<boolean>>,
  houses:  House[] | undefined
}



const ChartsInterface = ({ houses, setShowCharts }: Props) => {

  const {isSmallDevice} = useResponsive()
  return (
    <div className=" px-6 fixed z-50 min-h-[800px] min-w-[800px] bg-base-200 rounded-2xl shadow-2xl  ">
      <div className=" h-10 flex">
        {" "}
        <h1 className="text-blue-500 font-medium text-2xl mx-auto ">analytics</h1>
        <div className=""><BiMinus onClick={()=> setShowCharts(false)} className= 'text-blue-500 text-3xl mt-1'/></div>
      </div>
      {!isSmallDevice && <div className={` grid ${isSmallDevice? 'grid-cols-1': 'grid-cols-2'} gap-3 `}>
        <PredictChart houses={houses} />
        <RentCharts houses={houses} />
        <CapacityChart houses={houses} />
        <TenantChart houses={houses} />
      </div>}
    </div>
  );
};

export default ChartsInterface;
