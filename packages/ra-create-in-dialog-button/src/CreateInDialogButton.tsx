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
import React, { ReactNode, useState } from 'react';
import {
    Button,
    Create,
    CreateProps,
    Identifier,
    RaRecord,
    useGetResourceLabel,
    useNotify,
    useResourceContext,
    useTranslate,
} from 'react-admin';

export const CreateInDialogButton = (props: CreateInDialogButtonProps) => {
    const contextResource = useResourceContext();

    const {
        children,
        dialogTitle: dialogTitleProp,
        maxWidth = 'sm',
        fullWidth = false,
        resource = contextResource,
        label = 'ra.action.create',
        mutationOptions = {},
        ...rest
    } = props;

    const [open, setOpen] = useState(false);
    const translate = useTranslate();
    const getResourceLabel = useGetResourceLabel();
    const notify = useNotify();
    const { onSuccess, onError } = mutationOptions;

    const defaultDialogTitle = translate('ra.action.create_item', {
        item: getResourceLabel(resource, 1),
    });
    const dialogTitle = dialogTitleProp
        ? translate(dialogTitleProp, { _: dialogTitleProp })
        : defaultDialogTitle;

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
                aria-labelledby="dialog-title"
                open={open}
                className={CreateInDialogButtonClasses.dialog}
                scroll="paper"
            >
                <div className={CreateInDialogButtonClasses.header}>
                    <DialogTitle
                        id="dialog-title"
                        className={CreateInDialogButtonClasses.title}
                    >
                        {dialogTitle}
                    </DialogTitle>

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

                <DialogContent sx={{ padding: 0 }}>
                    <Create
                        title={<></>}
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
                            onError: (error, variables, context) => {
                                handleClose();

                                if (onError) {
                                    return onError(error, variables, context);
                                }

                                notify(
                                    typeof error === 'string'
                                        ? error
                                        : error.message ||
                                              'ra.notification.http_error',
                                    {
                                        type: 'error',
                                        messageArgs: {
                                            _:
                                                typeof error === 'string'
                                                    ? error
                                                    : error && error.message
                                                    ? error.message
                                                    : undefined,
                                        },
                                    }
                                );
                            },
                        }}
                    >
                        {children}
                    </Create>
                </DialogContent>
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
    | 'title'
    | 'sx'
    | 'className'
> & {
    children: ReactNode;
    dialogTitle?: string;
    maxWidth?: Breakpoint | false;
    fullWidth?: boolean;
    label?: string;
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
