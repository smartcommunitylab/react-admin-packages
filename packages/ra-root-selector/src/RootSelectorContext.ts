import { createContext, useContext } from 'react';

interface RootSelectorContextValue {
    resource: string;
    root: string | undefined;
    selectRoot: (record: any) => void;
    resetRoot: () => void;
}

export const RootSelectorContext = createContext<
    RootSelectorContextValue | undefined
>(undefined);

export const useRootSelector = () => {
    const rootSelector = useContext(RootSelectorContext);
    if (rootSelector === undefined) {
        throw new Error('useRootSelectorContext must be inside a provider');
    }
    return rootSelector;
};
