import React, {
    MouseEventHandler,
    ReactElement,
    ReactNode,
    useState,
} from 'react';
import {
    Button,
    EditBase,
    EditProps,
    RaRecord,
    useEditContext,
    useNotify,
    useRecordContext,
    useResourceContext,
    useTranslate,
} from 'react-admin';
import {
    Box,
    Breakpoint,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
    useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Create';

const defaultIcon = <EditIcon />;

export const EditInDialogButton = (props: EditInDialogButtonProps) => {
    const {
        children,
        title,
        icon = defaultIcon,
        maxWidth = 'sm',
        fullWidth = false,
        label = 'ra.action.edit',
        variant,
        mutationOptions = {},
        queryOptions = {},
        id: idProps,
        mutationMode = 'undoable',
        sx,
        emptyWhileLoading = false,
        ...rest
    } = props;

    const resource = useResourceContext(props);
    const record = useRecordContext(props);

    const id = idProps || record?.id;
    const [open, setOpen] = useState(false);
    const notify = useNotify();
    const { onSuccess } = mutationOptions;
    const { onError: queryOptionsOnError } = queryOptions;

    const closeDialog = () => {
        setOpen(false);
    };

    const handleDialogOpen: MouseEventHandler<HTMLButtonElement> = e => {
        setOpen(true);
        e.stopPropagation();
    };

    const handleDialogClose: MouseEventHandler<HTMLButtonElement> = e => {
        closeDialog();
        e.stopPropagation();
    };

    if (!id) return null;
    return (
        <>
            <Button
                label={label}
                onClick={handleDialogOpen}
                className={EditInDialogButtonClasses.button}
                variant={variant}
            >
                {icon}
            </Button>

            <EditDialog
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                onClose={handleDialogClose}
                aria-labelledby="edit-dialog-title"
                open={open}
                className={EditInDialogButtonClasses.dialog}
                scroll="paper"
                sx={sx}
            >
                <EditBase
                    resource={resource}
                    redirect={false}
                    id={id} //explicitly pass id because controller reads from route as fallback
                    mutationMode={mutationMode}
                    queryOptions={{
                        ...queryOptions,
                        /**
                         * The onError function of the queryOptions props is provided to override the default
                         * onError function used by the useGetOne hook within useEditController.
                         * Within the default function, after displaying a notification, two operations are executed:
                         * redirection to the list page of the resoruce and page refreshing.
                         * However, since the edit takes place inside a dialog, these two actions are not longer needed.
                         */
                        onError: error => {
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
                            closeDialog();

                            if (onSuccess) {
                                return onSuccess(data, variables, context);
                            }

                            /**
                             * If the onSuccess function is not provided, the notification is displayed
                             * by default, following the behavior of the useEditController hook.
                             * If the developer provides the onSuccess function, it is
                             * their responsibility to handle the notification display.
                             *
                             * It also important to rebember that, when the mutation mode is set to "undoable",
                             * it is crucial to explicitly set the undoable option of the notification to true.
                             * It plays a key role in initiating the submission of data once
                             * the notification disappears,typically after a 5-second interval.
                             */
                            notify('ra.notification.updated', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                                undoable: mutationMode === 'undoable',
                            });
                        },
                    }}
                    {...rest}
                >
                    <EditContent
                        title={title}
                        emptyWhileLoading={emptyWhileLoading}
                        handleClose={handleDialogClose}
                    >
                        {children}
                    </EditContent>
                </EditBase>
            </EditDialog>
        </>
    );
};

const EditContent = (props: {
    title: string | ReactElement;
    emptyWhileLoading: boolean;
    children: ReactNode;
    handleClose: MouseEventHandler;
}) => {
    const { title, emptyWhileLoading, children, handleClose } = props;
    const translate = useTranslate();
    const { defaultTitle, error, isLoading } = useEditContext();
    const theme = useTheme();

    if (error) {
        return null;
    }

    const content =
        isLoading && emptyWhileLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress
                    color="inherit"
                    size={theme.spacing(6)}
                    thickness={3}
                />
            </Box>
        ) : (
            children
        );

    return (
        <>
            <div className={EditInDialogButtonClasses.header}>
                <DialogTitle
                    id="edit-dialog-title"
                    className={EditInDialogButtonClasses.title}
                >
                    {!title
                        ? defaultTitle
                        : typeof title === 'string'
                        ? translate(title, { _: title })
                        : title}
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

            <DialogContent sx={{ p: 0 }}>{content}</DialogContent>
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
    icon?: ReactElement;
    variant?: 'text' | 'outlined' | 'contained';
    emptyWhileLoading?: boolean;
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
    name: PREFIX,
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
