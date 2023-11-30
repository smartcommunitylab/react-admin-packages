import React, { ReactElement, useEffect, useState } from 'react';
import { Button, ButtonProps } from 'react-admin';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { copyToClipboard } from './utils';

const defaultIcon = <ContentCopyIcon />;
const defaultSuccessIcon = <FileCopyIcon />;

export const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
    const {
        value,
        label = 'ra.action.clone',
        icon = defaultIcon,
        iconSuccess = defaultSuccessIcon,
        color = 'info',
        colorSuccess = 'success',
        onSuccess,
        ...rest
    } = props;
    const [copied, setCopied] = useState<boolean>(false);
    const handleCopy = e => {
        if (value) {
            copyToClipboard(value).then(() => {
                setCopied(true);
            });
        }

        e.stopPropagation();

        if (typeof onSuccess === 'function') {
            onSuccess(e);
        }
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [copied]);

    return (
        <Button
            onClick={handleCopy}
            label={label}
            color={copied ? colorSuccess : color}
            {...rest}
        >
            {copied ? iconSuccess : icon}
        </Button>
    );
};

export type CopyToClipboardButtonProps = ButtonProps & {
    /**
     * Text (string) to be copied
     */
    value: string;
    /**
     * (Optional) Custom icon for the button
     */
    icon?: ReactElement;
    /**
     * (Optional) Custom success icon for the button
     */
    iconSuccess?: ReactElement;
    /**
     * Color. Defaults to `info`
     */
    color?:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning';
    /**
     * Success color. Defaults to `success`
     */
    colorSuccess?:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning';
    /**
     * (Optional) handler for success
     */
    onSuccess?: (e: Event) => void;
};

export default CopyToClipboardButton;
