import React, { Fragment, ReactElement, useState } from 'react';
import {
    Button,
    ButtonProps,
    LoadingIndicator,
    RaRecord,
    useRecordContext,
    useResourceContext,
    useTranslate,
} from 'react-admin';
import { Breakpoint, Dialog, DialogContent, DialogTitle } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { SourceCodeBlock, SourceCodeBlockProps } from './SourceCodeBlock';
import { toCode } from './utils';

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
            <Dialog
                open={open}
                onClose={handleDialogClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                aria-labelledby="inspect-dialog-title"
            >
                <DialogTitle
                    id="inspect-dialog-title"
                    sx={{ paddingBottom: 0 }}
                >
                    {translate(label)}
                </DialogTitle>
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
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export type InspectButtonProps<RecordType extends RaRecord = any> =
    ButtonProps &
        Omit<SourceCodeBlockProps, 'code'> & {
            icon?: ReactElement;
            record?: RecordType;
            resource?: string;
            fullWidth?: boolean;
            maxWidth?: Breakpoint;
        };
