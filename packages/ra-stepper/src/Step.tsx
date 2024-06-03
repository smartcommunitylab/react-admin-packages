import { ReactNode } from 'react';

export const StepContent = (props: StepProps) => {
    const { children, label, optional = true } = props;
    return <>{children}</>;
};
export interface StepProps {
    label?: string;
    children: ReactNode;
    optional?: boolean;
}
