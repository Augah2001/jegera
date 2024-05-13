import Image from "next/image";
import dheni from "../assets/dheni.jpg";
import { Badge } from "@radix-ui/themes";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { House } from "../hooks/useHouses";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

interface Props {
  house: House
}

const HouseCard = ({house}: Props) => {

  const router = useRouter()
  const { isDark } = useContext(ThemeContext);
  return (
    <div className=" card rounded-none w-[100%] mb-4">
      <figure className=" shadow-md bg-base-200  h-[380px]">
        <CldImage
          src={house.backgroundImage? house.backgroundImage: '/images/profile_pictures/OIP_wqanmu'}
          width={1000}
          height={1000}
          alt="thumbnail"
          className="object-cover w-[55%] object-center h-full" // Add Tailwind class for object-fit
         
        />
        <div className="card-body  "  onClick={()=> router.push(`/houses/${house.id}`)}>
          <div className="flex justify-end">
            <h2 className="card-title text-base-content">{house.location.name}</h2>
          </div>
          <div className="flex justify-end">
            <h2 className="font-semibold text-gray-500">{`${house.minutes} minutes`}</h2>
          </div>
          <div className="flex justify-end">
            <h2 className="font-semibold text-gray-500">{`${house.capacity-house.occupied} remaining`}</h2>
          </div>
          <div className=" flex justify-end">
            <Badge
              className={`${
                !isDark
                  ? " text-white  bg-indigo-700"
                  : "text-indigo-700 bg-white"
              } ps-[10px] font-semibold h-8 w-16 text-lg rounded-0`}
            >
              {`$ ${house.price}`}
            </Badge>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default HouseCard;
