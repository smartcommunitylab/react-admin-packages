import { createContext, useContext } from 'react';

// everything that can be stored in search context
interface SearchContextValue {
    searchString: string;
    setSearchString: (record: any) => void;
}

// context
export const SearchContext = createContext<SearchContextValue | undefined>(
    undefined
);

// hook to get context value
export const useSearch = () => {
    const search = useContext(SearchContext);
    // TODO do something if search is undefined?
    return search;
};
