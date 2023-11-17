import { createContext, useContext } from 'react';

interface RootResourceSelectorContextValue {
    resource: string;
    context: string | undefined;
    selectContext: (resource: any) => void;
}

export const RootResourceSelectorContext = createContext<
    RootResourceSelectorContextValue | undefined
>(undefined);

export const useRootSelectorContext = () => {
    const rootSelector = useContext(RootResourceSelectorContext);
    if (rootSelector === undefined) {
        throw new Error('useRootSelectorContext must be inside a provider');
    }
    return rootSelector;
};
