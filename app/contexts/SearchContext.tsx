import { createContext, Dispatch, SetStateAction } from "react";

type SearchContextType = {
  searchValue: string;
  selectValue: string
  setSelectValue: Dispatch<SetStateAction<string>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);
