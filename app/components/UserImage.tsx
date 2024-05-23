import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import userImage from "../assets/user_placeholder.jpeg";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { User } from "../contexts/UserContext";

interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

interface Props {
  menuItems: { label: string; value: any }[];
  heading: string;
  user: User;
}

// eslint-disable-next-line react/display-name
const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ onClick, children }, ref) => {
    return (
      <button ref={ref} onClick={onClick}>
        {children}
      </button>
    );
  }
);

const UserImage = ({ menuItems, user, heading }: Props) => {

  return (
    <Menu>
      <MenuButton as={CustomButton} >
        <div className="h-[50px] w-[50px] rounded-[50px]">
          <CldImage
            src={user.backgroundImage}
            alt="user_Image"
           
            width={50}
            height={50}
            className="object-cover rounded-full object-center"
          />
        </div>
      </MenuButton>
      <MenuList>
        <Heading as="h6" fontSize="20px" textAlign="center" color="pink.500">
          {heading}
        </Heading>
        {menuItems.map((item, index) => (
          <Link href={item.value} key={index}>
            <MenuItem value={item.value} key={index}>
              {item.label}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};

export default UserImage;
