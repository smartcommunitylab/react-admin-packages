import { ReactElement, useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { RootSelectorContext } from './RootSelectorContext';
import React from 'react';

export type ResourceContextParams = {
    resource: string;
    initialApp: ReactElement;
    adminApp: ReactElement;
};
export const RootResourceContext = (props: ResourceContextParams) => {
    return (
        <BrowserRouter>
            <RootSelectorContextProvider {...props} />
        </BrowserRouter>
    );
};

export const RootSelectorContextProvider = (props: ResourceContextParams) => {
    const { resource, initialApp, adminApp } = props;
    const [resourceSelected, setResourceSelected] = useState<string>();
    const { context } = useParams();
    const navigate = useNavigate();
    const getResourceContext = () => {
        const id = resourceSelected ? resourceSelected : context;
        return id;
    };
    const selectResourceContext = (resource: any) => {
        setResourceSelected(resource['id']);
        navigate(`/-/` + resource['id']);
    };
    return (
        <RootSelectorContext.Provider
            value={{
                resource,
                resourceContext: getResourceContext,
                selectResourceContext,
            }}
        >
            <Routes>
                {/* domains list initial app */}
                <Route path="/*" element={initialApp} />
                {/* context sub app */}
                <Route path="/-/:context/*" element={adminApp} />
            </Routes>
        </RootSelectorContext.Provider>
    );
};
