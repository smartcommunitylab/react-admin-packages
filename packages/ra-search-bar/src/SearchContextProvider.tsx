import React, { useMemo, useState } from 'react';
import { SearchContext } from './SearchContext';
import { SearchProvider } from './SearchProvider';

// creates a SearchContext
export const Search = (props: SearchContextProviderParams) => {
    const { provider } = props;

    //TODO states

    //memoized function to handle changes in search
    const searchContext = useMemo(() => {
        const handleSearch = () => {
            //TODO receive input value as param
        };

        return {
            params: {}, //TODO
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
    provider: SearchProvider;
};
