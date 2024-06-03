import { MouseEventHandler, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStepper } from './StepperContext';
import { Button, styled } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useTranslate } from 'react-admin';
import { StepperButtonProps } from './types';

const defaultIcon = <NavigateBeforeIcon />;

export const PreviousButton = (props: PreviousButtonProps) => {
    const {
        color = 'primary',
        icon = defaultIcon,
        label: labelProp = 'ra.navigation.previous',
        onClick,
        disabled: disabledProp,
        variant = 'contained',
        alwaysEnable = false,
        ...rest
    } = props;
    const { steps, currentStep, goToStep } = useStepper();
    const translate = useTranslate();
    const label = labelProp && translate(labelProp, { _: labelProp });
    //disabled if requested or no prev step
    const disabled =
        disabledProp === true ||
        steps == undefined ||
        currentStep == undefined ||
        currentStep === 0;

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async event => {
            if (currentStep > 0) {
                goToStep(currentStep - 1);
            }

            if (onClick) {
                onClick(event);
            }
        },
        [goToStep, currentStep, steps]
    );

    if (currentStep > 0) {
        return (
            <StyledButton
                variant={variant}
                type={'button'}
                color={color}
                aria-label={label}
                disabled={disabled && !alwaysEnable}
                onClick={handleClick}
                {...rest}
            >
                {label} {icon}
            </StyledButton>
        );
    }

    return <></>;
};

export type PreviousButtonProps = StepperButtonProps;

PreviousButton.propTypes = {
    className: PropTypes.string,
    invalid: PropTypes.bool,
    label: PropTypes.string,
    variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
    icon: PropTypes.element,
    alwaysEnable: PropTypes.bool,
};

const PREFIX = 'RaStepperPreviousButton';

const StyledButton = styled(Button, {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    position: 'relative',
    [`& .MuiSvgIcon-root, & .MuiIcon-root`]: {
        fontSize: 18,
    },
}));
