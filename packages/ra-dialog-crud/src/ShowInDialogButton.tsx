import React, {
    MouseEventHandler,
    ReactElement,
    ReactNode,
    useState,
    useMemo,
} from 'react';
import {
    Button,
    RaRecord,
    ShowBase,
    ShowProps,
    useNotify,
    useRecordContext,
    useResourceContext,
    useShowContext,
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
import { DialogContext, useDialogContext } from './context';

import CloseIcon from '@mui/icons-material/Close';
import ShowIcon from '@mui/icons-material/RemoveRedEye';

const defaultIcon = <ShowIcon />;

export const ShowInDialogButton = (props: ShowInDialogButtonProps) => {
    const {
        children,
        title,
        icon = defaultIcon,
        maxWidth = 'sm',
        fullWidth = false,
        label = 'ra.action.show',
        variant,
        queryOptions = {},
        id: idProps,
        sx,
        emptyWhileLoading = false,
        disableAuthentication,
    } = props;

    const resource = useResourceContext(props);
    const record = useRecordContext(props);

    const id = idProps || record?.id;
    const [open, setOpen] = useState(false);
    const notify = useNotify();
    const { onError: queryOptionsOnError } = queryOptions;

    const handleDialogOpen: MouseEventHandler<HTMLButtonElement> = e => {
        setOpen(true);
        e.stopPropagation();
    };

    const handleDialogClose: MouseEventHandler<HTMLButtonElement> = e => {
        setOpen(false);
        e.stopPropagation();
    };

    const context = useMemo(
        () => ({
            isOpen: open,
            handleOpen: handleDialogOpen,
            handleClose: handleDialogClose,
            open: () => setOpen(true),
            close: () => setOpen(false),
        }),
        [handleDialogClose, handleDialogOpen]
    );

    if (!id) return null;

    return (
        <>
            <Button
                label={label}
                onClick={handleDialogOpen}
                className={ShowInDialogButtonClasses.button}
                variant={variant}
            >
                {icon}
            </Button>

            <StyledDialog
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                onClose={handleDialogClose}
                aria-labelledby="show-dialog-title"
                open={open}
                className={ShowInDialogButtonClasses.dialog}
                scroll="paper"
                sx={sx}
            >
                <ShowBase
                    resource={resource}
                    id={id} //explicitly pass id because controller reads from route as fallback
                    queryOptions={{
                        ...queryOptions,
                        /**
                         * The onError function of the queryOptions props is provided to override the default
                         * onError function used by the useGetOne hook within useShowController.
                         * Within the default function, after displaying a notification, two operations are executed:
                         * redirection to the list page of the resoruce and page refreshing.
                         * However, since the content is displayed inside a dialog, these two actions are not longer needed.
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
                    disableAuthentication={disableAuthentication}
                >
                    <DialogContext.Provider value={context}>
                        <ShowContent
                            emptyWhileLoading={emptyWhileLoading}
                            title={title}
                        >
                            {children}
                        </ShowContent>
                    </DialogContext.Provider>
                </ShowBase>
            </StyledDialog>
        </>
    );
};

const ShowContent = (props: {
    title: string | ReactElement;
    emptyWhileLoading: boolean;
    children: ReactNode;
}) => {
    const { title, emptyWhileLoading, children } = props;
    const { handleClose } = useDialogContext();
    const translate = useTranslate();
    const { defaultTitle, error, isLoading } = useShowContext();
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
            <div className={ShowInDialogButtonClasses.header}>
                <DialogTitle
                    id="show-dialog-title"
                    className={ShowInDialogButtonClasses.title}
                >
                    {!title
                        ? defaultTitle
                        : typeof title === 'string'
                        ? translate(title, { _: title })
                        : title}
                </DialogTitle>

                <IconButton
                    className={ShowInDialogButtonClasses.closeButton}
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

export type ShowInDialogButtonProps<RecordType extends RaRecord = RaRecord> =
    Omit<
        ShowProps<RecordType>,
        'actions' | 'aside' | 'className' | 'component'
    > & {
        maxWidth?: Breakpoint | false;
        fullWidth?: boolean;
        label?: string;
        variant?: 'text' | 'outlined' | 'contained';
        icon?: ReactElement;
    };

const PREFIX = 'RaShowInDialogButton';

export const ShowInDialogButtonClasses = {
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    header: `${PREFIX}-header`,
    title: `${PREFIX}-title`,
    closeButton: `${PREFIX}-close-button`,
};

const StyledDialog = styled(Dialog, {
    name: PREFIX,
    overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
    [`& .${ShowInDialogButtonClasses.title}`]: {
        padding: theme.spacing(0),
    },
    [`& .${ShowInDialogButtonClasses.header}`]: {
        padding: theme.spacing(2, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    [`& .${ShowInDialogButtonClasses.closeButton}`]: {
        height: 'fit-content',
    },
}));
