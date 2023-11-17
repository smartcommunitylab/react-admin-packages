import React, { ReactElement, useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { RootResourceSelectorContext } from './RootSelectorContext';

export const RootResourceContext = (props: ResourceContextParams) => {
    return (
        <BrowserRouter>
            <RootResourceContextProvider {...props} />
        </BrowserRouter>
    );
};

const RootResourceContextProvider = (props: ResourceContextParams) => {
    const { resource, initialApp, separator = '-', children } = props;
    const [selected, setSelected] = useState<string>();
    const { context } = useParams();
    const navigate = useNavigate();

    const getResourceContext = () => {
        const id = selected || context;
        return id;
    };

    const selectResourceContext = (resource: any) => {
        setSelected(resource['id']);
        navigate(`/${separator}/` + resource['id']);
    };
    return (
        <RootResourceSelectorContext.Provider
            value={{
                resource,
                context: getResourceContext(),
                selectContext: selectResourceContext,
            }}
        >
            <Routes>
                <Route path={`/${separator}/:context/*`} element={children} />
                <Route path="/*" element={initialApp} />
            </Routes>
        </RootResourceSelectorContext.Provider>
    );
};

export type ResourceContextParams = {
    resource: string;
    initialApp: ReactElement;
    separator?: string;
    children: React.ReactNode;
};
