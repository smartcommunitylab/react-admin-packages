import { Typography } from '@mui/material';
import { useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';

export const BreadcrumbItem = ({
    name,
    to,
    children,
}: {
    name: string;
    to?: string;
    children?: JSX.Element;
}) => {
    const translate = useTranslate();

    const typographyProps = to
        ? {
              color: 'text.secondary',
              sx: { '&:hover': { textDecoration: 'underline' } },
          }
        : { key: name, color: 'text.primary' };

    const child = children ? (
        children
    ) : (
        <Typography {...typographyProps}>{translate(name)}</Typography>
    );

    return to ? (
        <Link key={name} to={to} style={{ textDecoration: 'none' }}>
            {child}
        </Link>
    ) : (
        child
    );
};
