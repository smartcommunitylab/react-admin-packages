import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Breakpoint,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
} from '@mui/material';
import React, { ReactElement, useState } from 'react';
import {
    Button,
    RaRecord,
    ShowBase,
    ShowProps,
    ShowView,
    useNotify,
    useRecordContext,
    useResourceContext,
    useShowContext,
    useTranslate,
} from 'react-admin';

const Title = (props: TitleProps) => {
    const { propsTitle: title } = props;
    const translate = useTranslate();
    const { defaultTitle } = useShowContext();

    return (
        <DialogTitle
            id="dialog-title"
            className={ShowInDialogButtonClasses.title}
        >
            {!title
                ? defaultTitle
                : typeof title === 'string'
                ? translate(title, { _: title })
                : title}
        </DialogTitle>
    );
};

export const ShowInDialogButton = (props: ShowInDialogButtonProps) => {
    const contextResource = useResourceContext();
    const record = useRecordContext();

    const {
        children,
        title: propsTitle,
        maxWidth = 'sm',
        fullWidth = false,
        resource = contextResource,
        label = 'ra.action.show',
        queryOptions = {},
        id = record.id,
        sx,
        emptyWhileLoading,
        disableAuthentication,
    } = props;

    const [open, setOpen] = useState(false);
    const translate = useTranslate();
    const notify = useNotify();
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
                className={ShowInDialogButtonClasses.button}
            >
                <VisibilityIcon />
            </Button>

            <ShowDialog
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                open={open}
                className={ShowInDialogButtonClasses.dialog}
                scroll="paper"
                sx={sx}
            >
                <ShowBase
                    resource={resource}
                    id={id}
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
                    disableAuthentication={disableAuthentication}
                >
                    <>
                        <div className={ShowInDialogButtonClasses.header}>
                            <Title propsTitle={propsTitle} />

                            <IconButton
                                className={
                                    ShowInDialogButtonClasses.closeButton
                                }
                                aria-label={translate('ra.action.close')}
                                title={translate('ra.action.close')}
                                onClick={handleClose}
                                size="small"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </div>

                        <DialogContent sx={{ padding: 0 }}>
                            <ShowView
                                title={<></>}
                                emptyWhileLoading={emptyWhileLoading}
                            >
                                {children}
                            </ShowView>
                        </DialogContent>
                    </>
                </ShowBase>
            </ShowDialog>
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
    };

type TitleProps = {
    propsTitle: string | ReactElement;
};

const PREFIX = 'RaShowInDialogButton';

export const ShowInDialogButtonClasses = {
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    header: `${PREFIX}-header`,
    title: `${PREFIX}-title`,
    closeButton: `${PREFIX}-close-button`,
};

const ShowDialog = styled(Dialog, {
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
