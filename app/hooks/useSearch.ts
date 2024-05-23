import React, { Dispatch } from "react";

const useSearch = <T>(
  
) => {

  const handleChange = (query: string,
    initialData: T[] | undefined,
    setData: Dispatch<React.SetStateAction<T[] | undefined>>,
    setSearchValue: (value: React.SetStateAction<string>) => void) => {

    setSearchValue(query);

  const data = initialData?.filter((item: any) => {
    const regex = new RegExp(
      (Number.isInteger(query) ? parseInt(query) : query) as string,
      "i"
    );
    for (let key in item) {
      if (item[key] instanceof Object) {
        for (let key2 in item[key]) {
          if (regex.test(item[key][key2])) {
            return true;
          }
        }
      }
      if (regex.test(item[key])) {
        return true;
      }
    }

    return false;
  });

  query?.length == 0 ? setData(initialData) : setData(data);
  return data

  }
return {handleChange}
};

export default useSearch;
