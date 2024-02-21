import React, { ReactElement, useMemo, useState } from 'react';
import { SearchContext } from './SearchContext';
import { SearchParams, SearchProvider } from './SearchProvider';

// creates a SearchContext
export const Search = (props: SearchContextProviderParams) => {
    const { searchProvider, children } = props;
    const [currentSearch, setCurrentSearch] = useState<SearchParams>({});

    //memoized function to handle changes in search
    const searchContext = useMemo(() => {
        const handleSearch = (search: SearchParams) => {
            setCurrentSearch(search);
        };

        return {
            params: currentSearch, //can contain q, fq
            setParams: handleSearch,
            provider: searchProvider,
        };
    }, [currentSearch, searchProvider]);

    return (
        <SearchContext.Provider value={searchContext}>
            {children}
        </SearchContext.Provider>
    );
};

export type SearchContextProviderParams = {
    searchProvider: SearchProvider;
    children: ReactElement;
};
