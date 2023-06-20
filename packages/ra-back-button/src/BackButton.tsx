import React from 'react';
import { Button, ButtonProps } from 'react-admin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const BackButton = (props: ButtonProps) => {
    const navigate = useNavigate();
    const { label = 'ra.action.back', ...rest } = props;
    return (
        <Button label={label} onClick={() => navigate(-1)} {...rest}>
            <ArrowBackIcon />
        </Button>
    );
};

export default BackButton;
