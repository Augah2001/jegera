import { createContext, Dispatch, SetStateAction } from "react";

type SearchContextType = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);
