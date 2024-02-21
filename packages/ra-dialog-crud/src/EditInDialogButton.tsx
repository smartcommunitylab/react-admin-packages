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
import React, { ReactNode, useState } from 'react';
import {
    Button,
    Edit,
    EditProps,
    RaRecord,
    useGetRecordRepresentation,
    useGetResourceLabel,
    useNotify,
    useRecordContext,
    useResourceContext,
    useTranslate,
} from 'react-admin';

export const EditInDialogButton = (props: EditInDialogButtonProps) => {
    const contextResource = useResourceContext();
    const record = useRecordContext();

    const {
        children,
        dialogTitle: dialogTitleProp,
        maxWidth = 'sm',
        fullWidth = false,
        resource = contextResource,
        label = 'ra.action.edit',
        mutationOptions = {},
        queryOptions = {},
        id = record.id,
        mutationMode = 'undoable',
        ...rest
    } = props;

    const [open, setOpen] = useState(false);
    const translate = useTranslate();
    const getResourceLabel = useGetResourceLabel();
    const getRecordRepresentation = useGetRecordRepresentation(resource);
    const notify = useNotify();
    const { onSuccess, onError: mutationOptionsOnError } = mutationOptions;
    const { onError: queryOptionsOnError } = queryOptions;

    const recordRepresentation = getRecordRepresentation(record);
    const defaultDialogTitle = translate('ra.page.edit', {
        name: getResourceLabel(resource, 1),
        id,
        record,
        recordRepresentation:
            typeof recordRepresentation === 'string'
                ? recordRepresentation
                : '',
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
            >
                <div className={EditInDialogButtonClasses.header}>
                    <DialogTitle
                        id="dialog-title"
                        className={EditInDialogButtonClasses.title}
                    >
                        {dialogTitle}
                    </DialogTitle>

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
                    {/* scomporre in editbase e editview */}
                    <Edit
                        title={<></>}
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
                            onError: (error, variables, context) => {
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
                        {children}
                    </Edit>
                </DialogContent>
            </EditDialog>
        </>
    );
};

export type EditInDialogButtonProps<
    RecordType extends RaRecord = RaRecord,
    MutationOptionsError = unknown
> = Omit<
    EditProps<RecordType, MutationOptionsError>,
    | 'actions'
    | 'aside'
    | 'component'
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
