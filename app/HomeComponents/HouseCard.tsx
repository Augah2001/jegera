import Image from "next/image";
import dheni from "../assets/dheni.jpg";
import { Badge } from "@radix-ui/themes";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { House } from "../hooks/useHouses";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { UserContext } from "../contexts/UserContext";
import { FormModalContext } from "../contexts/FormModalContext";
import { BiEdit, BiLogoMessenger, BiSolidTrash, BiTrash } from "react-icons/bi";
import { ShowMessageContext } from "../contexts/ShowMessageContext";
import { ChatContext } from "../contexts/SelectedChatContext";
import { HouseContext } from "../contexts/SelectedHouseContext";
import apiClient from "../configs/apiClient";
import { HousesContext } from "../contexts/HouseContext";
import { useToast } from "@chakra-ui/toast";
import { AxiosError } from "axios";

interface Props {
  house: House;
}

const HouseCard = ({ house }: Props) => {
  const { user } = useContext(UserContext);
  const { onOpen } = useContext(FormModalContext);
  const { setShowMessage, showMessage } = useContext(ShowMessageContext);
  const { setChatUser } = useContext(ChatContext);
  const { setSelectedHouse } = useContext(HouseContext);
  const { setHouses, houses } = useContext(HousesContext);

  const toast = useToast()
  const router = useRouter();
  const { isDark } = useContext(ThemeContext);

  const handleDelete = (id: number) => {
    const prevHouses = houses 
    const newHouses = houses?.filter(house => house.id !== id)
    setHouses(newHouses)
     apiClient.delete<House>(`/houses/${id}`).then(res => {
      toast({ title: "deleted successful", colorScheme: "green" });
     }).catch((err: AxiosError) => {
        setHouses(prevHouses)
        toast({ title: "not deleted", colorScheme: "red" });
     })
  }


  return (
    <div className=" card rounded-none w-[100%]">
      <figure className=" shadow-md bg-base-200  h-[380px]">
        <CldImage
          src={
            house.backgroundImage
              ? house.backgroundImage
              : "/images/profile_pictures/OIP_wqanmu"
          }
          width={1000}
          height={1000}
          alt="thumbnail"
          className="object-cover w-[55%] object-center h-full" // Add Tailwind class for object-fit
        />
        <div className="card-body flex flex-col justify-between  ">
          <div
            className=" w-full h-full"
            onClick={() => {
              !user && onOpen();
              user && router.push(`/houses/${house.id}`);
            }}
          >
            <div className="flex justify-end">
              <h2 className="card-title text-base-content">
                {house.location.name}
              </h2>
            </div>
            <div className="flex justify-end">
              <h2 className="font-semibold text-gray-500">{`${house.minutes} minutes`}</h2>
            </div>
            <div className="flex justify-end">
              <h2 className="font-semibold text-gray-500">{`${
                house.capacity - house.occupied
              } remaining`}</h2>
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
          <div className="flex justify-end">
            <BiLogoMessenger
              className="text-4xl text-purple-700"
              onClick={() => {
                setShowMessage(!showMessage);
                setChatUser(house.owner);
                setSelectedHouse(house);
              }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <BiEdit className="hover:text-slate-500
             text-slate-300 
             text-2xl cursor-pointer"
             onClick={()=> handleEdit(house.id)}
             />
            <BiSolidTrash className="hover:text-red-500
             text-slate-300 text-2xl cursor-pointer"
             onClick={()=> handleDelete(house.id)}
             />
          </div>
        </div>
      </figure>
    </div>
  );
};

export default HouseCard;
