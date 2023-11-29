import React, { useEffect, useState } from 'react';
import { Button, TopToolbar } from 'react-admin';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { copyToClipboard } from './utils';

export const CopyToClipboardButton = (props: { value: string }) => {
    const { value } = props;
    const [copied, setCopied] = useState<boolean>(false);
    const handleCopy = e => {
        if (value) {
            copyToClipboard(value).then(() => {
                setCopied(true);
            });
        }

        e.stopPropagation();
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => setCopied(false), 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [copied]);

    return (
        <TopToolbar variant="dense" sx={{ padding: 0, minHeight: '32px' }}>
            {' '}
            <Button
                onClick={handleCopy}
                label="ra.action.clone"
                color={copied ? 'success' : 'info'}
            >
                {copied ? <FileCopyIcon /> : <ContentCopyIcon />}
            </Button>
        </TopToolbar>
    );
};

export default CopyToClipboardButton;
