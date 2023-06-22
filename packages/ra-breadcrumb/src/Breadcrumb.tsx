import { Breadcrumbs, SxProps, Theme } from '@mui/material';
import { BreadcrumbResourceItems } from './breadcrumbUtils';
import React from 'react';

export type BreadcrumbProps = {
    children?: any;
    sx?: SxProps<Theme>;
};

export const Breadcrumb = (props: BreadcrumbProps) => {
    const { children, ...rest } = props;

    if (children) {
        return (
            <Breadcrumbs
                aria-label="breadcrumb"
                sx={{ paddingTop: '10px' }}
                {...rest}
            >
                {children}
            </Breadcrumbs>
        );
    }

    return <BreadcrumbResourceItems {...rest} />;
};
