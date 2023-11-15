import { createContext, useContext } from 'react';

interface RootSelectorContextValue {
    resource: string;
    resourceContext: () => string | undefined;
    selectResourceContext: (resource: any) => void;
}

export const RootSelectorContext = createContext<
    RootSelectorContextValue | undefined
>(undefined);

export const useRootSelectorContext = () => {
    const menuRootSelector = useContext(RootSelectorContext);
    if (menuRootSelector === undefined) {
        throw new Error('useRootSelectorContext must be inside a provider');
    }
    return menuRootSelector;
};
