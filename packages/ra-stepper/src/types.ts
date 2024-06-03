import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ButtonProps } from '@mui/material';

export type StepperButtonProps = ButtonProps & {
    icon?: ReactElement;
    label?: string;
    variant?: string;
    alwaysEnable?: boolean;
};
