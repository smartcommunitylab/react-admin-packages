import { createContext, useContext } from 'react';

interface DialogContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    handleOpen: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const DialogContext = createContext<DialogContextValue | undefined>(
    undefined
);

export const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (context === undefined) {
        throw new Error('useDialogContext must be inside a provider');
    }
    return context;
};
