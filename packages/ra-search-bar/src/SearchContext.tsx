import { createContext, useContext } from 'react';
import { SearchParams, SearchProvider } from './SearchProvider';

// everything that can be stored in search context
interface SearchContextValue {
    params: SearchParams;
    setParams: (record: any) => void;
    provider: SearchProvider;
}

// context
export const SearchContext = createContext<SearchContextValue | undefined>(
    undefined
);

// hook to get context value
export const useSearch = () => {
    const search = useContext(SearchContext);
    //TODO do something more?
    return search;
};

export const useSearchProvider = () => {
    const { provider } = useSearch();
    //TODO check undefined
    return provider;
};
