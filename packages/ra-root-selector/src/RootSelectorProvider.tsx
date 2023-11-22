import React, { ReactElement, isValidElement, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { Layout, ResourceContextProvider } from 'react-admin';
import { RootSelectorContext } from './RootSelectorContext';
import { RootSelectorList } from './RootSelectorList';
import { isValidDataProvider, withRootSelector } from './utils';

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
        const handleSelect = (resource: any) => {
            setSelected(resource['id']);
            navigate(`${basename}/${separator}/` + resource['id']);
        };

        return {
            resource,
            root: current,
            selectRoot: handleSelect,
        };
    }, [resource, current, navigate, basename, separator]);

    const appProps = {
        basename: `${basename}/${separator}/${current}`,
    } as any;

    if (
        children.props.dataProvider &&
        isValidDataProvider(children.props.dataProvider)
    ) {
        //wrap it
        appProps.dataProvider = withRootSelector(
            children.props.dataProvider,
            current
        );
    }

    const app = React.cloneElement(children, appProps);

    return (
        <RootSelectorContext.Provider value={selectorContext}>
            {app}
        </RootSelectorContext.Provider>
    );
};

const InitialWrapper = (props: RootSelectorParams) => {
    const {
        resource,
        basename = '',
        separator = '-',
        selector,
        children,
    } = props;
    const navigate = useNavigate();

    const selectorContext = useMemo(() => {
        const handleSelect = (resource: any) => {
            navigate(`${basename}/${separator}/` + resource['id']);
        };

        return {
            resource,
            root: null,
            selectRoot: handleSelect,
        };
    }, [basename, navigate, resource, separator]);

    const dummy = () => <></>;
    const hasSelector = selector === undefined || !!selector !== false;
    const dashboard = () => {
        return (
            <ResourceContextProvider value={resource}>
                {selector && hasSelector && isValidElement(selector) ? (
                    React.cloneElement(selector, {
                        ...props,
                    })
                ) : (
                    <RootSelectorList
                        {...props}
                        resource={resource}
                        skipToFirst={!hasSelector}
                    />
                )}
            </ResourceContextProvider>
        );
    };

    const layout = (props: any) => <Layout {...props} sidebar={dummy} />;

    const initialApp = React.cloneElement(children, {
        basename: `${basename}`,
        layout,
        dashboard: dashboard,
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
    const initialApp = <InitialWrapper {...props} />;

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
    selector?: ReactElement | boolean;

    /**
     * source field (for resource) to be used as label
     */
    source?: string;
};

RootSelector.propTypes = { children: PropTypes.element.isRequired };
