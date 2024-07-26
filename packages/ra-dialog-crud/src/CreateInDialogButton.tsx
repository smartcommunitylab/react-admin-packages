import React, {
    MouseEventHandler,
    ReactElement,
    ReactNode,
    useState,
} from 'react';
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
import {
    Breakpoint,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const defaultIcon = <AddIcon />;

export const CreateInDialogButton = (props: CreateInDialogButtonProps) => {
    const {
        children,
        title,
        icon = defaultIcon,
        maxWidth = 'sm',
        fullWidth = false,
        label = 'ra.action.create',
        variant,
        mutationOptions = {},
        sx,
        ...rest
    } = props;

    const resource = useResourceContext(props);

    const [open, setOpen] = useState(false);
    const notify = useNotify();
    const { onSuccess } = mutationOptions;

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

    return (
        <>
            <Button
                label={label}
                onClick={handleDialogOpen}
                className={CreateInDialogButtonClasses.button}
                variant={variant}
            >
                {icon}
            </Button>

            <CreateDialog
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                onClose={handleDialogClose}
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
                            closeDialog();

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
                    <CreateContent
                        title={title}
                        handleClose={handleDialogClose}
                    >
                        {children}
                    </CreateContent>
                </CreateBase>
            </CreateDialog>
        </>
    );
};

const CreateContent = (props: {
    title: string | ReactElement;
    children: ReactNode;
    handleClose: MouseEventHandler;
}) => {
    const { title, children, handleClose } = props;
    const translate = useTranslate();
    const { defaultTitle } = useCreateContext();

    return (
        <>
            <div className={CreateInDialogButtonClasses.header}>
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

            <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
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
    variant?: 'text' | 'outlined' | 'contained';
    icon?: ReactElement;
};

const PREFIX = 'RaCreateInDialogButton';

export const CreateInDialogButtonClasses = {
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    header: `${PREFIX}-header`,
    title: `${PREFIX}-title`,
    closeButton: `${PREFIX}-close-button`,
};

const CreateDialog = styled(Dialog, {
    name: PREFIX,
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
