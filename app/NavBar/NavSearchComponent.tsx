
import { SearchIcon } from "@chakra-ui/icons";
import { Button } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { SearchContext } from "../contexts/SearchContext";
import { InitialHousesContext } from "../contexts/InitialDataContext";
import { HousesContext } from "../contexts/HouseContext";
import { initialPriceRange, priceOptions } from "../configs/services";

const SearchComponent = () => {
  const {isDark} = useContext(ThemeContext)
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const  {searchValue, setSearchValue, selectValue, setSelectValue} = useContext(SearchContext)
  const  { initialHouses} = useContext(InitialHousesContext)
  const  { setHouses} = useContext(HousesContext)
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<string>(initialPriceRange);

  const handlePriceChange = (value: string) => {
    setSelectValue(value)
    const selectedValue = value
    setSelectedPriceRange(selectedValue);

    if (selectedValue === "any") {
      setHouses(initialHouses);
    } else {
      const [minValue, maxValue] = selectedValue.split("-").map(Number);

      const newHouses = initialHouses?.filter(
        (house) =>
          house.price >= minValue && house.price <= maxValue
      );
      setHouses(newHouses);
    }
  }; 

  const handleSearchInput = (query: string) => {
    
    setSearchValue(query)
    if (!query) return

    const data = initialHouses?.filter(house=> {
      const regex = new RegExp((Number.isInteger(query)?parseInt(query): query) as string, "i");
      for (let key in house) {
        if (house[key] instanceof Object) {
          for (let key2 in house[key] ) {
            if (regex.test(house[key][key2])) { return true}
          }
        }
        if (regex.test(house[key])) {
          return true;
        }
      }

      return false;
    })

    query?.length == 0? setHouses(initialHouses): setHouses(data)
  }

  

  return (
    <div
      className={` ${'h-[60px] w-[100%]'} ${
        isClicked1 || isClicked2 || isClicked3 ? "bg-base-200 " : "bg-base-100"
      } items-center
           rounded-[500px] flex m-auto w-[80%] border-base-300
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
          onChange={ (e)=> handleSearchInput(e.currentTarget.value)}
          type="text"
          className={`w-[100%] text-base-content ps-10 me-2 bg-transparent  ${
            isHovered && !isClicked1 && "bg-base-300"
          }  rounded-s-[500px] outline-none rounded-[500px] mt-[0px] h-[87.5px] w-[100%]
          ${
            isDark && isClicked1 && "bg-[#211649] shadow-md rounded-[500px]"
          }
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
          value={selectValue}
          onChange={(e) => handlePriceChange(e.currentTarget.value)}
          name=""
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
            <option key={index}  value= {o.value}>
            {o.label}
          </option>
           )}

        
        </select>
      </div>
      <div className="w-[1.5px] h-[40%] bg-purple-700  "></div>
      <div
        className={`w-[20%] ms-2 flex min-h-[100%] justify-end pe-3 items-center ${
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
        <Button className={` 'h-[35px] rounded-[500px] w-[94%] flex justify-start p-6 text-xl  bg-gradient-to-r to-pink.300 from-purple-600`}>
          <SearchIcon className="" /> 
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;
