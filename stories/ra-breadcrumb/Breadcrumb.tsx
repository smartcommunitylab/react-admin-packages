import { Breadcrumbs } from '@mui/material';
import {
    BreadcrumbItem,
    BreadcrumbProps,
} from '../../packages/ra-breadcrumb/src';
import React from 'react';

export const Breadcrumb = (props: BreadcrumbProps) => {
    const {
        children,
        separator = '/',
        maxItems = 6,
        sx = { paddingTop: '10px' },
        ...rest
    } = props;

    const links = [
        <BreadcrumbItem name="Dashboard" to="/" />,
        <BreadcrumbItem name="Posts" to="/posts" />,
        <BreadcrumbItem name="1" to="/posts/1" />,
        <BreadcrumbItem name="Edit" />,
    ];

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
