
import { zodResolver } from '@hookform/resolvers/zod';

import React, { useContext, useEffect, useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form';
import apiClient from '../configs/apiClient';
import { ThemeContext } from '../contexts/ThemeContext';


const useAuth = <T>(schema: any, route: string, deleteFlag: number) => {
    const [data, setData] = useState<T[]>([]);
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    apiClient.get<T[]>(route).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [route, deleteFlag]);



  const onSubmit = async (myData: FieldValues) => {
    let token = "";
    for (let i = 1; i <= 16; i++) {
      const randInt = Math.floor(Math.random() * 9);
      token = token + randInt.toString();
    }
    const newData = { ...myData, authorizationKey: token };
    setToken(token);

    try {
      const response = await apiClient.post(route, newData);
      console.log(route)
      setData([...data, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return {onSubmit, data, token, errors, handleSubmit, register,}
}

export default useAuth
