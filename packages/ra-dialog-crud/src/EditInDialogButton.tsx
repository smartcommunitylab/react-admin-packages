import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
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
    EditBase,
    EditProps,
    EditView,
    RaRecord,
    useEditContext,
    useNotify,
    useRecordContext,
    useResourceContext,
    useTranslate,
} from 'react-admin';

const Title = (props: TitleProps) => {
    const { propsTitle: title } = props;
    const translate = useTranslate();
    const { defaultTitle } = useEditContext();

    return (
        <DialogTitle
            id="dialog-title"
            className={EditInDialogButtonClasses.title}
        >
            {!title
                ? defaultTitle
                : typeof title === 'string'
                ? translate(title, { _: title })
                : title}
        </DialogTitle>
    );
};

export const EditInDialogButton = (props: EditInDialogButtonProps) => {
    const contextResource = useResourceContext();
    const record = useRecordContext();

    const {
        children,
        title: propsTitle,
        maxWidth = 'sm',
        fullWidth = false,
        resource = contextResource,
        label = 'ra.action.edit',
        mutationOptions = {},
        queryOptions = {},
        id = record.id,
        mutationMode = 'undoable',
        sx,
        ...rest
    } = props;

    const [open, setOpen] = useState(false);
    const translate = useTranslate();
    const notify = useNotify();
    const { onSuccess, onError: mutationOptionsOnError } = mutationOptions;
    const { onError: queryOptionsOnError } = queryOptions;

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
                className={EditInDialogButtonClasses.button}
            >
                <EditIcon />
            </Button>

            <EditDialog
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                open={open}
                className={EditInDialogButtonClasses.dialog}
                scroll="paper"
                sx={sx}
            >
                <EditBase
                    resource={resource}
                    redirect={false}
                    id={id}
                    mutationMode={mutationMode}
                    queryOptions={{
                        ...queryOptions,
                        onError: error => {
                            handleClose();

                            if (queryOptionsOnError) {
                                return queryOptionsOnError(error);
                            }

                            notify('ra.notification.item_doesnt_exist', {
                                type: 'error',
                            });
                        },
                    }}
                    mutationOptions={{
                        ...mutationOptions,
                        onSuccess: (data, variables, context) => {
                            handleClose();

                            if (onSuccess) {
                                return onSuccess(data, variables, context);
                            }

                            /**
                             * If the onSuccess function is not provided, the notification is displayed by default, following the behavior of the useEditController hook.
                             * If the developer provides the onSuccess function, it is their responsibility to handle the notification display.
                             *
                             * It also important to rebember that, when the mutation mode is set to "undoable", it is crucial to explicitly set the undoable option of the notification to true.
                             * It plays a key role in initiating the submission of data once the notification disappears, typically after a 5-second interval.
                             */
                            notify('ra.notification.updated', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                                undoable: mutationMode === 'undoable',
                            });
                        },
                        onError: (
                            error: Error | string,
                            variables,
                            context
                        ) => {
                            handleClose();

                            if (mutationOptionsOnError) {
                                return mutationOptionsOnError(
                                    error,
                                    variables,
                                    context
                                );
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
                    {...rest}
                >
                    <div className={EditInDialogButtonClasses.header}>
                        <Title propsTitle={propsTitle} />

                        <IconButton
                            className={EditInDialogButtonClasses.closeButton}
                            aria-label={translate('ra.action.close')}
                            title={translate('ra.action.close')}
                            onClick={handleClose}
                            size="small"
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>

                    <DialogContent sx={{ padding: 0 }}>
                        <EditView title={<></>}>{children}</EditView>
                    </DialogContent>
                </EditBase>
            </EditDialog>
        </>
    );
};

export type EditInDialogButtonProps<
    RecordType extends RaRecord = RaRecord,
    MutationOptionsError = unknown
> = Omit<
    EditProps<RecordType, MutationOptionsError>,
    'actions' | 'aside' | 'component' | 'redirect' | 'className'
> & {
    children: ReactNode;
    maxWidth?: Breakpoint | false;
    fullWidth?: boolean;
    label?: string;
};

type TitleProps = {
    propsTitle: string | ReactElement;
};

const PREFIX = 'RaEditInDialogButton';

export const EditInDialogButtonClasses = {
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    header: `${PREFIX}-header`,
    title: `${PREFIX}-title`,
    closeButton: `${PREFIX}-close-button`,
};

const EditDialog = styled(Dialog, {
    overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
    [`& .${EditInDialogButtonClasses.title}`]: {
        padding: theme.spacing(0),
    },
    [`& .${EditInDialogButtonClasses.header}`]: {
        padding: theme.spacing(2, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    [`& .${EditInDialogButtonClasses.closeButton}`]: {
        height: 'fit-content',
    },
}));
