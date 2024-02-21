import React, { ReactElement, useMemo, useState } from 'react';
import { SearchContext } from './SearchContext';
import { SearchProvider } from './SearchProvider';

// creates a SearchContext
export const Search = (props: SearchContextProviderParams) => {
    const { searchProvider: provider } = props;

    //TODO states

    //memoized function to handle changes in search
    const searchContext = useMemo(() => {
        const handleSearch = () => {
            //TODO receive input value as param
        };

        return {
            params: {}, //can contain q, fq
            setParams: handleSearch,
            provider: provider,
        };
    }, [provider]);

    return (
        <SearchContext.Provider value={searchContext}>
            {/* {app} */}
        </SearchContext.Provider>
    );
};

export type SearchContextProviderParams = {
    searchProvider: SearchProvider;
    children: ReactElement;
};
