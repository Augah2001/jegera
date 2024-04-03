import Image from "next/image";
import dheni from "./assets/dheni.jpg";
import { Badge } from "@radix-ui/themes";
import { ThemeContext } from "./contexts/ThemeContext";
import { useContext } from "react";


const HouseCard = () => {

  const {isDark} = useContext(ThemeContext)
  return (
    <div className=" card rounded-none w-[100%] mb-4">
      <figure className=" shadow-md bg-bse-200  max-h-[415px] h-auto">
        <Image
          src={dheni}
          alt="thumbnail"
          objectPosition="center"
          layout="fit" // Use layout="fill" for responsive sizing
          objectFit="cover" // Use objectFit="cover" to crop if needed
          className="object-cover w-[55%] object-center" // Add Tailwind class for object-fit
          priority // Prioritize loading this image for a better experience
        />
        <div className="card-body  ">
          <div className="flex justify-end">
            <h2 className="card-title text-base-content">Mount Pleasant</h2>
          </div>
          <div className="flex justify-end">
            <h2 className="font-semibold text-gray-500">3 minutes</h2>
          </div>
          <div className=" flex justify-end">
            <Badge className={`${!isDark? ' text-white  bg-indigo-700': 'text-indigo-700 bg-white'} ps-[10px] font-semibold h-8 w-16 text-lg rounded-0` }
              
              
            >$100</Badge>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default HouseCard;
