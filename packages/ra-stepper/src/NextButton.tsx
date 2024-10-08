import { MouseEventHandler, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStepper } from './StepperContext';
import { Button, styled } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslate } from 'react-admin';
import { StepperButtonProps } from './types';
import { useFormContext } from 'react-hook-form';

const defaultIcon = <NavigateNextIcon />;

export const NextButton = (props: NextButtonProps) => {
    const {
        color = 'primary',
        icon = defaultIcon,
        label: labelProp = 'ra.navigation.next',
        onClick,
        disabled: disabledProp,
        variant = 'contained',
        alwaysEnable = false,
        validateBeforeNext = true,
        ...rest
    } = props;
    const { steps, currentStep, goToStep } = useStepper();
    const translate = useTranslate();
    const label = labelProp && translate(labelProp, { _: labelProp });
    const form = useFormContext();

    //disabled if requested or no next step
    const disabled =
        disabledProp === true ||
        steps == undefined ||
        currentStep == undefined ||
        currentStep === steps.length;

    const toNextStep = () => {
        if (currentStep < steps.length) {
            goToStep(currentStep + 1);
        }
    }

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        event => {
            if (onClick) {
                onClick(event);
            }
            if (validateBeforeNext) {
                form.handleSubmit(toNextStep)(event);
            } else {
                toNextStep();
            }
        },
        [goToStep, currentStep, steps]
    );

    if (currentStep < steps.length - 1) {
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
                {icon} {label}
            </StyledButton>
        );
    }

    return <></>;
};

export type NextButtonProps = StepperButtonProps;

NextButton.propTypes = {
    className: PropTypes.string,
    invalid: PropTypes.bool,
    label: PropTypes.string,
    variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
    icon: PropTypes.element,
    alwaysEnable: PropTypes.bool,
};

const PREFIX = 'RaStepperNextButton';

const StyledButton = styled(Button, {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    position: 'relative',
    [`& .MuiSvgIcon-root, & .MuiIcon-root`]: {
        fontSize: 18,
    },
}));
