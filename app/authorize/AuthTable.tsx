import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Auth } from "./page";
import { BiSolidTrash, BiTrash } from "react-icons/bi";
import apiClient from "../configs/apiClient";

const AuthTable = ({ data, route, setDeleteFlag }: { data: any[], route: string,setDeleteFlag: React.Dispatch<React.SetStateAction<number>>
}) => {



  const toast = useToast()


    const handlelete = (item:any) => {
       
       
        apiClient.delete(`${route}/${item.authorizationKey}`)
        .then(res => {
          toast({title: 'deleted successfully', colorScheme: 'green', position: 'top'})
          const number = Math.random()
          setDeleteFlag(number)
        }).catch(err=> {
          toast({title: 'an error occured', colorScheme: 'red', position: 'top'})
          console.log(err)
        })
    }
  return (
    <TableContainer w={"auto"}>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>
              <h1 className="font-medium">Owner</h1>
            </Th>
            <Th>
              <h1 className="font-medium">Auth-key</h1>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>
                <p className="font-medium me-2">{item.fullName}</p>
              </td>
              <td>
                <p className="font-medium">{item.authorizationKey}</p>
              </td>
              <td>
                
                  <BiSolidTrash onClick={()=> handlelete(item)}
                   className="text-slate-300  hover:text-red-500 ms-3"
                  >
                    delete
                  </BiSolidTrash>
               
              </td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AuthTable;
