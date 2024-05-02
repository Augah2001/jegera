import { Menu, MenuButton, MenuList, MenuItem,  Heading } from "@chakra-ui/react";
import { forwardRef } from "react";
import userImage from '../assets/user_placeholder.jpeg'
import Image from "next/image";
import Link from "next/link";



interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

interface Props {
  menuItems: { label: string; value: any }[];
  heading: string
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

const UserImage = ({ menuItems, heading}: Props) => {
  return (
    <Menu >
      <MenuButton  as={CustomButton}  w="fit-content">
       <Image src={userImage} alt="user_Image" className="w-[50px] rounded-full"/>
      </MenuButton>
      <MenuList>
      <Heading as= "h6" fontSize= "20px" textAlign= "center" color= "pink.500">{heading}</Heading>
      {menuItems.map((item, index) => (
          <Link href={item.value} key={index}>
            <MenuItem value={item.value} key={index} >
              {item.label}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
};

export default UserImage;