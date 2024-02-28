import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
    Breakpoint,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
} from '@mui/material';
import React, { ReactElement, ReactNode, useState } from 'react';
import {
    Button,
    CreateBase,
    CreateProps,
    Identifier,
    RaRecord,
    useCreateContext,
    useNotify,
    useResourceContext,
    useTranslate,
} from 'react-admin';

const Title = (props: TitleProps) => {
    const { propsTitle: title } = props;
    const translate = useTranslate();
    const { defaultTitle } = useCreateContext();

    return (
        <DialogTitle
            id="create-dialog-title"
            className={CreateInDialogButtonClasses.title}
        >
            {!title
                ? defaultTitle
                : typeof title === 'string'
                ? translate(title, { _: title })
                : title}
        </DialogTitle>
    );
};

export const CreateInDialogButton = (props: CreateInDialogButtonProps) => {
    const contextResource = useResourceContext();

    const {
        children,
        title: propsTitle,
        maxWidth = 'sm',
        fullWidth = false,
        resource = contextResource,
        label = 'ra.action.create',
        mutationOptions = {},
        sx,
        ...rest
    } = props;

    const [open, setOpen] = useState(false);
    const translate = useTranslate();
    const notify = useNotify();
    const { onSuccess } = mutationOptions;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                label={label}
                onClick={handleOpen}
                className={CreateInDialogButtonClasses.button}
            >
                <AddIcon />
            </Button>

            <AddDialog
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                onClose={handleClose}
                aria-labelledby="create-dialog-title"
                open={open}
                className={CreateInDialogButtonClasses.dialog}
                scroll="paper"
                sx={sx}
            >
                <CreateBase
                    resource={resource}
                    redirect={false}
                    {...rest}
                    mutationOptions={{
                        ...mutationOptions,
                        onSuccess: (data, variables, context) => {
                            handleClose();

                            if (onSuccess) {
                                return onSuccess(data, variables, context);
                            }

                            notify('ra.notification.created', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                            });
                        },
                    }}
                >
                    <div className={CreateInDialogButtonClasses.header}>
                        <Title propsTitle={propsTitle} />

                        <IconButton
                            className={CreateInDialogButtonClasses.closeButton}
                            aria-label={translate('ra.action.close')}
                            title={translate('ra.action.close')}
                            onClick={handleClose}
                            size="small"
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>

                    <DialogContent sx={{ p: 0 }}>
                        {children ? children : null}
                    </DialogContent>
                </CreateBase>
            </AddDialog>
        </>
    );
};

export type CreateInDialogButtonProps<
    RecordType extends Omit<RaRecord, 'id'> = any,
    MutationOptionsError = unknown,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier }
> = Omit<
    CreateProps<RecordType, MutationOptionsError, ResultRecordType>,
    | 'actions'
    | 'aside'
    | 'component'
    | 'hasEdit'
    | 'hasShow'
    | 'redirect'
    | 'className'
> & {
    children: ReactNode;
    maxWidth?: Breakpoint | false;
    fullWidth?: boolean;
    label?: string;
};

type TitleProps = {
    propsTitle: string | ReactElement;
};

const PREFIX = 'RaCreateInDialogButton';

export const CreateInDialogButtonClasses = {
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    header: `${PREFIX}-header`,
    title: `${PREFIX}-title`,
    closeButton: `${PREFIX}-close-button`,
};

const AddDialog = styled(Dialog, {
    overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
    [`& .${CreateInDialogButtonClasses.title}`]: {
        padding: theme.spacing(0),
    },
    [`& .${CreateInDialogButtonClasses.header}`]: {
        padding: theme.spacing(2, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    [`& .${CreateInDialogButtonClasses.closeButton}`]: {
        height: 'fit-content',
    },
}));
