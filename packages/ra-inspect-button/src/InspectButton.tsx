import React, { Fragment, ReactElement, useState, useCallback } from 'react';
import {
    Button,
    ButtonProps,
    LoadingIndicator,
    RaRecord,
    useRecordContext,
    useResourceContext,
    useTranslate,
} from 'react-admin';
import { Breakpoint, Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { SourceCodeBlock, SourceCodeBlockProps } from './SourceCodeBlock';
import { toCode } from './utils';
import CloseIcon from '@mui/icons-material/Close';

const defaultIcon = <TroubleshootIcon />;

export const InspectButton = (props: InspectButtonProps) => {
    const {
        label = 'ra.configurable.inspector.title',
        icon = defaultIcon,
        fullWidth = false,
        maxWidth = 'md',
        color = 'info',
        language = 'json',
        record: recordFromProps,
        resource: resourceFromProps,
        theme = 'dark',
        showLineNumbers = false,
        showCopyButton = true,
        onCopyButtonSuccess,
        ...rest
    } = props;
    const translate = useTranslate();
    const [open, setOpen] = useState(false);

    const resourceContext = useResourceContext();
    const recordContext = useRecordContext();

    const resource = resourceFromProps || resourceContext;
    const record = recordFromProps || recordContext;
    const isLoading = !record;

    const source: string = toCode(language, record);

    const handleDialogOpen = e => {
        setOpen(true);
        e.stopPropagation();
    };

    const handleDialogClose = e => {
        setOpen(false);
        e.stopPropagation();
    };
    const handleClick = useCallback(e => {
        e.stopPropagation();
    }, []);

    return (
        <Fragment>
            <Button
                label={label}
                onClick={handleDialogOpen}
                color={color}
                {...rest}
            >
                {icon}
            </Button>
            <InspectDialog
                open={open}
                onClose={handleDialogClose}
                onClick={handleClick}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                aria-labelledby="inspect-dialog-title"
            >
                            <div className={InspectDialogButtonClasses.header}>

                <DialogTitle
                    id="inspect-dialog-title"
                    className={InspectDialogButtonClasses.title}

                >
                    {translate(label)}
                </DialogTitle>
                <IconButton
                        aria-label={translate('ra.action.close')}
                        title={translate('ra.action.close')}
                        onClick={handleDialogClose}
                        size="small"
                        className={InspectDialogButtonClasses.closeButton}

                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    </div>

                <DialogContent>
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <SourceCodeBlock
                            code={source}
                            language={language}
                            theme={theme}
                            showLineNumbers={showLineNumbers}
                            showCopyButton={showCopyButton}
                            onCopyButtonSuccess={onCopyButtonSuccess}
                        />
                    )}
                </DialogContent>
            </InspectDialog>
        </Fragment>
    );
};

export type InspectButtonProps<RecordType extends RaRecord = any> =
    ButtonProps &
        Omit<SourceCodeBlockProps, 'code'> & {
            /**
             * (Optional) Custom icon for the button
             */
            icon?: ReactElement;
            /**
             * (Optional) record object to use in place of the context
             */
            record?: RecordType;
            /**
             * (Optional) resource identifier to use in place of the context
             */
            resource?: string;
            /**
             * Display the modal window as full-width, filling the viewport. Defaults to `false`
             */
            fullWidth?: boolean;
            /**
             * Max width for the modal window (breakpoint). Defaults to `md`
             */
            maxWidth?: Breakpoint;
        };
const PREFIX = 'RaInspectDialogButton';

export const InspectDialogButtonClasses = {
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    header: `${PREFIX}-header`,
    title: `${PREFIX}-title`,
    closeButton: `${PREFIX}-close-button`,
};

const InspectDialog = styled(Dialog, {
    name: PREFIX,
    overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
    [`& .${InspectDialogButtonClasses.title}`]: {
        padding: theme.spacing(0),
    },
    [`& .${InspectDialogButtonClasses.header}`]: {
        padding: theme.spacing(2, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    [`& .${InspectDialogButtonClasses.closeButton}`]: {
        height: 'fit-content',
    },
}));
