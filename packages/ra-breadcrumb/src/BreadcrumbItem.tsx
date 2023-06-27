import { Typography } from '@mui/material';
import { useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';

export const BreadcrumbItem = ({ name, to }: { name: string; to?: string }) => {
    const translate = useTranslate();
    return to ? (
        <Link key={name} to={to} style={{ textDecoration: 'none' }}>
            <Typography
                color="text.secondary"
                sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
                {translate(name)}
            </Typography>
        </Link>
    ) : (
        <Typography key={name} color="text.primary">
            {translate(name)}
        </Typography>
    );
};

export default BreadcrumbItem;
