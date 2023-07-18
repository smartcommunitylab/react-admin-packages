import { Breadcrumbs } from '@mui/material';
import { useTranslate, useResourceContext } from 'react-admin';
import { useLocation } from 'react-router-dom';
import { BreadcrumbProps } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';

export const BreadcrumbResourceItems = (props: BreadcrumbProps) => {
    const {
        children,
        separator = '/',
        maxItems = 6,
        sx = { paddingTop: '10px' },
        ...rest
    } = props;
    const translate = useTranslate();
    const location = useLocation();
    const resource = useResourceContext();

    const regexShow = '^/[^/]*/([^/]*)/show(/.*)?$';
    const regexCreate = '^/[^/]*/create(/.*)?$';
    const regexEdit = '^/[^/]*/([^/]*)(/[^/]*)?$';

    let links = null;
    links = [];

    if (resource) {
        // Dashboard
        links.push(
            <BreadcrumbItem key="dashboard" name="ra.page.dashboard" to="/" />
        );

        const matchShow = location.pathname.match(regexShow);
        if (matchShow && matchShow[1]) {
            // List
            links.push(
                <BreadcrumbItem
                    key="list"
                    name={translate(`resources.${resource}.name`, {
                        smart_count: 2,
                        _: resource,
                    })}
                    to={`/${resource}`}
                />
            );

            // Show
            links.push(<BreadcrumbItem key="show" name={matchShow[1]} />);
        } else if (location.pathname.match(regexCreate)) {
            // List
            links.push(
                <BreadcrumbItem
                    key="list"
                    name={translate(`resources.${resource}.name`, {
                        smart_count: 2,
                        _: resource,
                    })}
                    to={`/${resource}`}
                />
            );

            // Create
            links.push(<BreadcrumbItem key="create" name="ra.action.create" />);
        } else {
            const matchEdit = location.pathname.match(regexEdit);
            if (matchEdit && matchEdit[1]) {
                // List
                links.push(
                    <BreadcrumbItem
                        key="list"
                        name={translate(`resources.${resource}.name`, {
                            smart_count: 2,
                            _: resource,
                        })}
                        to={`/${resource}`}
                    />
                );

                // Show
                links.push(
                    <BreadcrumbItem
                        key="show"
                        name={matchEdit[1]}
                        to={`/${resource}/${matchEdit[1]}/show`}
                    />
                );

                // Edit
                links.push(<BreadcrumbItem key="edit" name="ra.action.edit" />);
            } else {
                // List
                links.push(
                    <BreadcrumbItem
                        key="list"
                        name={translate(`resources.${resource}.name`, {
                            smart_count: 2,
                            _: resource,
                        })}
                    />
                );
            }
        }
    } else {
        // Dashboard
        links.push(<BreadcrumbItem key="dashboard" name="ra.page.dashboard" />);
    }

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={sx}
            separator={separator}
            maxItems={maxItems}
            {...rest}
        >
            {links}
        </Breadcrumbs>
    );
};

export default BreadcrumbResourceItems;
