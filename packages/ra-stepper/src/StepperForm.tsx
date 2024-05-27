import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'ra-core';
import {
    CardContent,
    Box,
    Button,
    Step as MuiStep,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SaveButton, SimpleForm, SimpleFormProps, Toolbar } from 'react-admin';
import { Step, StepperContext, useStepper } from './StepperContext';

const DefaultToolbar = <Toolbar />;
export const StepperForm = (props: StepperFormProps) => {
    const {
        children,
        className,
        component: Component = DefaultComponent,
        sx,
        toolbar,
        ...rest
    } = props;

    const [activeStep, setActiveStep] = React.useState(0);
    const isStepOptional = (step: boolean) => {
        return step;
    };

    const goToStep = (index: number) => {
        if (setActiveStep) setActiveStep(prevActiveStep => index);
    };
    const steps: any[] = children
        ? Array.isArray(children)
            ? children.map(step => step.props)
            : [children]
        : [];

    return (
        <Form {...rest}>
            <StepperContext.Provider
                value={{ steps: steps, currentStep: activeStep, goToStep }}
            >
                <Component className={className} sx={sx}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            if (isStepOptional(step.optional)) {
                                labelProps.optional = (
                                    <Typography variant="caption">
                                        Optional
                                    </Typography>
                                );
                            }

                            const stepLabel = step.label || 'Step ' + index;
                            return (
                                <MuiStep key={'step_' + index} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {stepLabel}
                                    </StepLabel>
                                </MuiStep>
                            );
                        })}
                    </Stepper>
                    <React.Fragment>
                        {steps[activeStep]?.children}
                        {toolbar ? (
                            toolbar
                        ) : (
                            <Toolbar sx={{ justifyContent: 'space-between' }}>
                                <Box>
                                    <BackButton />
                                </Box>
                                <Box>
                                    <NextButton />
                                    {activeStep === steps.length - 1 && (
                                        <SaveButton />
                                    )}
                                </Box>
                            </Toolbar>
                        )}
                    </React.Fragment>
                </Component>
            </StepperContext.Provider>
        </Form>
    );
};
export const BackButton = () => {
    const { steps, currentStep, goToStep } = useStepper();
    if (currentStep > 0)
        return (
            <Button onClick={() => goToStep(currentStep - 1)}>{'Back'}</Button>
        );
    <></>;
};
export const NextButton = () => {
    const { steps, currentStep, goToStep } = useStepper();
    if (currentStep < steps.length - 1)
        return (
            <Button onClick={() => goToStep(currentStep + 1)}>{'Next'}</Button>
        );
    <></>;
};
SimpleForm.propTypes = {
    children: PropTypes.node,
    defaultValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    // @ts-ignore
    record: PropTypes.object,
    toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([false])]),
    validate: PropTypes.func,
};

export interface StepperFormProps extends Omit<SimpleFormProps, 'children'> {
    children:
        | ReactElement<any, React.JSXElementConstructor<Step>>
        | ReactElement<any, React.JSXElementConstructor<Step>>[];
}

const PREFIX = 'RaStepperForm';

const DefaultComponent = styled(CardContent, {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        paddingBottom: '5em',
    },
}));

// const DefaultToolbar = <Toolbar />;
export const StepContent = (props: StepProps) => {
    const { children, label } = props;
    return <>{children}</>;
};
export interface StepProps {
    label: string;
    children: ReactNode;
}
