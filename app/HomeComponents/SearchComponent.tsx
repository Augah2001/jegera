import { SearchIcon } from "@chakra-ui/icons";
import { Button } from "@radix-ui/themes";
import React, { Dispatch, useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { SearchContext } from "../contexts/SearchContext";
import { HouseContext } from "../contexts/SelectedHouseContext";
import { HousesContext } from "../contexts/HouseContext";
import axios from "axios";
import apiClient from "../configs/apiClient";
import { InitialHousesContext } from "../contexts/InitialDataContext";
import { priceOptions,initialPriceRange } from "../configs/services";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useResponsive } from "../hooks/useResponsive";
import useSearch from "../hooks/useSearch";
import { House } from "../hooks/useHouses";

const SearchComponent = () => {
  const { isDark } = useContext(ThemeContext);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const {isSmallDevice} = useResponsive()
  const {handleChange } = useSearch<House>()

  const { searchValue, setSearchValue, selectValue, setSelectValue } =
    useContext(SearchContext);
    const [selectedPriceRange, setSelectedPriceRange] =
    useState<string>(initialPriceRange);

    const {initialHouses, setInitialHouses} = useContext(InitialHousesContext)
    const [initialThisHouses, setInitialThisHouses] = useState<House[] | undefined>(initialHouses)
    const { houses, setHouses} = useContext(HousesContext)

    
    const handlePriceChange = (value: string) => {
      console.log(value)
      setSelectValue(value)
      setSelectedPriceRange(selectValue);
  
      if (value=== "any") {
        setHouses(initialHouses);
      } else {
        const [minValue, maxValue] = value.split("-").map(Number);
        console.log(value)
  
        const newHouses = initialHouses?.filter(
          (house) =>
            house.price >= minValue && house.price <= maxValue
        );
        setHouses(newHouses);
        
        
      }
      
    };  
    
    

  return (
    <div
      className={` ${
        isClicked1 || isClicked2 || isClicked3 ? "bg-base-200 " : "bg-base-100"
      } items-center
          h-[90px] mt-8 rounded-[500px] flex m-auto w-[80%] border-base-300
          shadow-base-300 shadow-xl border-[0.5px] `}
      onBlur={() => setIsClicked1(false)}
    >
      <div
        className={`w-[50%] me-2  min-h-[100%] ${
          isHovered && !isClicked1 && "bg-base-300"
        }  rounded-s-[500px]
          
          ${
            isClicked1 && "bg-base-100 shadow-md rounded-[500px]"
          } hover:rounded-[500px]`}
        onClick={() => {
          setIsClicked1(true), setIsClicked2(false);
          setIsClicked3(false);
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onBlur={() => console.log("augah")}
      >
        <input
          placeholder="search keyword"
          value={searchValue}
          onChange={(e) => {
            handleChange(e.currentTarget.value, initialHouses, setHouses,setSearchValue)
          }}
          
          type="search"
          className={`w-[100%] text-base-content ps-10 me-2 bg-transparent  ${
            isHovered && !isClicked1 && "bg-base-300"
          }  rounded-s-[500px] outline-none rounded-[500px] mt-[0px] h-[87.5px] w-[100%]
          ${isDark && isClicked1 && "bg-[#211649] shadow-md rounded-[500px]"}
           hover:rounded-[500px]`}
          onClick={() => {
            setIsClicked1(true), setIsClicked2(false);
            setIsClicked3(false);
          }}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        />
      </div>
      <div className="w-[1.5px] h-[40%] bg-purple-700   "></div>

      <div
        className={`w-[30%] mx-2 min-h-[100%] ${
          isHovered1 && !isClicked2 && "bg-base-300"
        }  rounded-s-[500px]
          ${
            isClicked2 && "bg-base-100 shadow-md rounded-[500px]"
          }  hover:rounded-[500px]`}
        onClick={() => {
          setIsClicked1(false);
          setIsClicked2(true);
          setIsClicked3(false);
        }}
        onMouseEnter={() => {
          setIsHovered1(true);
        }}
        onMouseLeave={() => {
          setIsHovered1(false);
        }}
        onBlur={() => console.log("augah")}
      >
        <select
          name=""
          value={selectValue}
          onChange={(e) => handlePriceChange(e.currentTarget.value)}
          id=""
          className={`w-[100%] text-base-content px-9 bg-transparent min-h-[100%] ${
            isHovered1 && !isClicked2 && "bg-base-300"
          }  
            rounded-s-[500px]  outline-none mt-[0px] h-[87.5px] w-[100%]
          ${
            isClicked2 && isDark && "bg-[#211649] shadow-md rounded-[500px]"
          }  hover:rounded-[500px]`}
          onClick={() => {
            setIsClicked1(false);
            setIsClicked2(true);
            setIsClicked3(false);
          }}
          onMouseEnter={() => {
            setIsHovered1(true);
          }}
          onMouseLeave={() => {
            setIsHovered1(false);
          }}
        >
          {priceOptions.map((o , index)=>
            <option key={index}   value= {o.value} onChange={(e)=>console.log(e.currentTarget.value)}>
            {o.label}
          </option>
           )}
        </select>
      </div>
      <div className=" hidden md:block w-[1.5px] h-[40%] bg-purple-700  "></div>
      {!isSmallDevice && <div
        className={`cursor-pointer  w-[20%] ms-2 flex min-h-[100%] justify-end pe-3 items-center ${
          isHovered2 && !isClicked3 && "bg-base-300"
        }  rounded-s-[500px]
          ${
            isClicked3 && "bg-base-100 shadow-md rounded-[500px]"
          } hover:rounded-[500px]`}
        onClick={() => {
          setIsClicked1(false);
          setIsClicked2(false);
          setIsClicked3(true);
        }}
        onMouseEnter={() => {
          setIsHovered2(true);
        }}
        onMouseLeave={() => {
          setIsHovered2(false);
        }}
      >
        {!isSmallDevice && <button className=" justify-center items-center cursor-pointer bg-blue-700 font-medium text-white text-2xl h-[70px] rounded-[500px] w-[94%] flex     bg-gradient-to-r to-pink.300 from-purple-600  ">
          {" Search"}
        </button>}
      </div>}
    </div>
  );
};

export default SearchComponent;
