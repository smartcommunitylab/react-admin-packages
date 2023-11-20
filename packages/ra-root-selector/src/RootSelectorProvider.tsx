import React, { ReactElement, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { Layout } from 'react-admin';
import { RootSelectorContext } from './RootSelectorContext';
import { RootSelectorList } from './RootSelectorList';

export const RootSelector = (props: RootSelectorParams) => {
    const { basename = '' } = props;
    return (
        <BrowserRouter basename={basename}>
            <RootSelectorContextProvider {...props} />
        </BrowserRouter>
    );
};

const AppWrapper = (props: RootSelectorParams) => {
    const { resource, basename = '', separator = '-', children } = props;
    const [selected, setSelected] = useState<string>();
    const { context } = useParams();
    const navigate = useNavigate();
    const current = selected || context;

    const selectorContext = useMemo(() => {
        const selectResourceContext = (resource: any) => {
            setSelected(resource['id']);
            navigate(`${basename}/${separator}/` + resource['id']);
        };

        return {
            resource,
            context: current,
            selectContext: selectResourceContext,
        };
    }, [resource, current, navigate, basename, separator]);

    return (
        <RootSelectorContext.Provider value={selectorContext}>
            {React.cloneElement(children, {
                basename: `${basename}/${separator}/${current}`,
            })}
        </RootSelectorContext.Provider>
    );
};

const InitalWrapper = (props: RootSelectorParams) => {
    const {
        resource,
        basename = '',
        separator = '-',
        selector,
        children,
    } = props;
    const navigate = useNavigate();

    const selectorContext = useMemo(() => {
        const selectResourceContext = (resource: any) => {
            navigate(`${basename}/${separator}/` + resource['id']);
        };

        return {
            resource,
            context: null,
            selectContext: selectResourceContext,
        };
    }, [basename, navigate, resource, separator]);

    const dummy = () => <></>;
    const dashboard = () => <RootSelectorList {...props} resource={resource} />;
    const layout = (props: any) => <Layout {...props} sidebar={dummy} />;

    const initialApp = React.cloneElement(children, {
        basename: `${basename}`,
        layout: layout,
        dashboard: selector || dashboard,
    });

    return (
        <RootSelectorContext.Provider value={selectorContext}>
            {initialApp}
        </RootSelectorContext.Provider>
    );
};

const RootSelectorContextProvider = (props: RootSelectorParams) => {
    const { separator = '-' } = props;
    const contextApp = <AppWrapper {...props} />;
    const initialApp = <InitalWrapper {...props} />;

    return (
        <Routes>
            <Route path={`/${separator}/:context/*`} element={contextApp} />
            <Route path="/*" element={initialApp} />
        </Routes>
    );
};

export type RootSelectorParams = {
    /**
     * resource identifier to define the resource used as root context
     */
    resource: string;
    /**
     * React-Admin (like) child
     */
    children: ReactElement;
    /**
     * basename for routing
     */
    basename?: string;
    /**
     * path separator for context
     */
    separator?: string;
    /**
     * custom selector to be displayed in initial app for context selection
     */
    selector?: ReactElement;
    /**
     * source field (for resource) to be used as label
     */
    source?: string;
};

RootSelector.propTypes = { children: PropTypes.element.isRequired };
