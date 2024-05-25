import { Button, FormLabel, Input } from '@chakra-ui/react'
import React, { useContext } from 'react'
import useAuth from '../hooks/useAuth'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'
import AuthTable from './AuthTable'
import { ThemeContext } from '../contexts/ThemeContext'

interface  Props {
    data: any
    token: string
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    route: string
    setDeleteFlag: React.Dispatch<React.SetStateAction<number>>

  }

const AuthOwnerPage = ({data, token, register, errors, route, setDeleteFlag}: Props) => {

    const {isDark} = useContext(ThemeContext) 
  return (
    <div className='mt-6'>
        <div>
            <FormLabel
              className="ps-2 text-base-content text-xl "
              style={{ fontSize: "18px" }}
            >
              Owner fullname
            </FormLabel>
            <Input
              type="text"
              {...register("fullName")}
              height={12}
              focusBorderColor="purple.500"
              borderRadius="6px"
              _focus={{
                borderWidth: "1.5px",
                borderStyle: "solid",
                bg: isDark ? "#302E5E" : "#ECECEC",
              }}
              _hover={{ borderWidth: "1.5px", borderStyle: "solid" }}
              variant="outline"
              borderStyle={"solid"}
              borderWidth={"2px"}
              borderColor="purple.500"
              className="text-base-content bg-base-100"
            />
            {errors["fullName"] && (
              <p className="text-red-600 mx-4 mt-3 font-medium">
                {errors["fullName"]?.message as string}
              </p>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="text-base-content bg-purple-700 text-2xl"
              color={"white"}
              bg={"purple.700"}
              _hover={{ opacity: 0.7 }}
              _active={{ opacity: 1 }}
            >
              generate
            </Button>
          </div>
          <div
            className="bg-base-300 shadow-xl border-solid border-blue-500 flex mt-6 h-[60px]"
            style={{ borderWidth: "2px" }}
          >
            {token && (
              <h1 className="m-auto font-semibold text-base-content ">
                {token}
              </h1>
            )}
          </div>
          <div className="mt-10">
            <AuthTable setDeleteFlag={setDeleteFlag} data={data} route= {route} />
          </div>
    </div>
  )
}

export default AuthOwnerPage
