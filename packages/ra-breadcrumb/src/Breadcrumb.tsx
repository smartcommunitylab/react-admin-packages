import { Breadcrumbs } from '@mui/material';
import { BreadcrumbResourceItems } from './BreadcrumbResourceItems';
import { SxProps, Theme } from '@mui/material/styles';

export type BreadcrumbProps = {
    children?: React.ReactNode;
    separator?: React.ReactNode;
    maxItems?: number;
    sx?: SxProps<Theme>;
};

export const Breadcrumb = (props: BreadcrumbProps) => {
    const {
        children,
        separator = '/',
        maxItems = 6,
        sx = { paddingTop: '10px' },
        ...rest
    } = props;

    if (children) {
        return (
            <Breadcrumbs
                aria-label="breadcrumb"
                sx={sx}
                separator={separator}
                maxItems={maxItems}
                {...rest}
            >
                {children}
            </Breadcrumbs>
        );
    }

    return <BreadcrumbResourceItems {...rest} />;
};
