import { createContext, useContext } from 'react';

// everything that can be stored in search context
interface StepperContextValue {
    steps: Step[];
    currentStep: number;
    goToStep: (index: number) => void;
}
export interface Step {
    children: React.ReactNode;
    label: string;
}
// context
export const StepperContext = createContext<StepperContextValue | undefined>(
    undefined
);

// hook to get context value
export const useStepper = () => {
    const stepper = useContext(StepperContext);
    if (stepper === undefined) {
        throw new Error('useStepper must be used inside a StepperContext');
    }
    return stepper;
};
