import * as React from 'react';
import { ReactElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    FormProps,
    SaveButton,
    Toolbar,
    useTranslate,
} from 'react-admin';
import {
    CardContent,
    Box,
    Step as MuiStep,
    StepLabel,
    Stepper,
    Typography,
    StackProps,
} from '@mui/material';
import { SxProps, styled } from '@mui/material/styles';
import { Step, StepperContext, useStepper } from './StepperContext';
import { PreviousButton } from './PreviousButton';
import { NextButton } from './NextButton';
import { StepContent } from './Step';

export const StepperForm = (props: StepperFormProps) => {
    const {
        children,
        className,
        component: Component = DefaultComponent,
        sx,
        toolbar = <DefaultToolbar />,
        ...rest
    } = props;
    const translate = useTranslate();

    const isStepOptional = (step: boolean) => {
        return step;
    };

    const [activeStep, setActiveStep] = React.useState(0);

    const goToStep = useMemo(() => {
        return (index: number) => {
            if (index >= 0) {
                setActiveStep(index);
            }
        };
    }, [setActiveStep]);

    const steps: Step[] = useMemo(() => {
        return children
            ? Array.isArray(children)
                ? children.map(step => step.props)
                : [children]
            : [];
    }, [children]);

    const context = { steps: steps, currentStep: activeStep, goToStep };

    return (
        <Form {...rest}>
            <StepperContext.Provider value={context}>
                <Component className={className} sx={sx}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            if (!isStepOptional(step.optional)) {
                                labelProps.optional = (
                                    <Typography variant="caption">
                                        {translate('ra.validation.required')}
                                    </Typography>
                                );
                            }

                            const stepLabel = step.label ? translate(step.label) : '#' + index;
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
                    </React.Fragment>
                    {toolbar !== false ? toolbar : <></>}
                </Component>
            </StepperContext.Provider>
        </Form>
    );
};

//export namespaced components
StepperForm.PreviousButton = PreviousButton;
StepperForm.NextButton = NextButton;
StepperForm.Step = StepContent;

export interface StepperFormProps extends Omit<FormProps, 'render'> {
    children:
        | ReactElement<any, React.JSXElementConstructor<Step>>
        | ReactElement<any, React.JSXElementConstructor<Step>>[];
    component?: React.ComponentType<any>;

    defaultValues?: any;
    toolbar?: ReactElement | false;
    sx?: SxProps;
    className?: string;
}

StepperForm.propTypes = {
    children: PropTypes.node,
    defaultValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    // @ts-ignore
    record: PropTypes.object,
    toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([false])]),
    validate: PropTypes.func,
};

const PREFIX = 'RaStepperForm';

const DefaultComponent = styled(CardContent, {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        paddingBottom: '5em',
    },
}));

const DefaultToolbar = () => {
    const { steps, currentStep } = useStepper();

    return (
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box>
                <PreviousButton variant={'text'} color="secondary" />
            </Box>
            <Box>
                <NextButton />
                {steps && currentStep === steps.length - 1 && <SaveButton />}
            </Box>
        </Toolbar>
    );
};
