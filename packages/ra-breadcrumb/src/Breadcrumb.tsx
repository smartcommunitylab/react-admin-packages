import { Breadcrumbs } from '@mui/material';
import { BreadcrumbResourceItems } from './BreadcrumbResourceItems';
import { SxProps, Theme } from '@mui/material/styles';

export type BreadcrumbProps = {
    children?: React.ReactNode;
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
