import * as React from 'react';
import { useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ActionDelete from '@mui/icons-material/Delete';
import AlertError from '@mui/icons-material/ErrorOutline';
import { useTranslate } from 'ra-core';
import { Button } from 'react-admin';

/**
 * Delete Confirmation dialog
 *
 * @example
 * <Confirm
 *     isOpen={true}
 *     title="Delete Item"
 *     content="Are you sure you want to delete this item?"
 *     confirm="Yes"
 *     deleteColor="danger"
 *     ConfirmIcon=ActionCheck
 *     CancelIcon=AlertError
 *     cancel="Cancel"
 *     onDelete={() => { // do something }}
 *     onClose={() => { // do something }}
 * />
 */
export const DeleteConfirm = (props: any) => {
    const {
        className,
        isOpen = false,
        loading,
        title,
        content,
        cancel = 'ra.action.cancel',
        DeleteIcon = ActionDelete,
        CancelIcon = AlertError,
        onClose,
        onDelete,
        disableDeleteButton,
        translateOptions = {},
        ...rest
    } = props;

    const translate = useTranslate();

    const handleDelete = useCallback(
        (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            onDelete(e);
        },
        [onDelete]
    );

    const handleClick = useCallback((e: { stopPropagation: () => void }) => {
        e.stopPropagation();
    }, []);

    return (
        <Dialog
            className={className}
            open={isOpen}
            onClose={onClose}
            onClick={handleClick}
            aria-labelledby="alert-dialog-title"
            {...rest}
        >
            <DialogTitle id="alert-dialog-title">
                {typeof title === 'string'
                    ? translate(title, { _: title, ...translateOptions })
                    : title}
            </DialogTitle>
            <DialogContent>
                {typeof content === 'string' ? (
                    <DialogContentText>
                        {translate(content, {
                            _: content,
                            ...translateOptions,
                        })}
                    </DialogContentText>
                ) : (
                    content
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    label={translate(cancel, { _: cancel })}
                    disabled={loading}
                    onClick={onClose}
                >
                    {<CancelIcon />}
                </Button>
                <Button
                    disabled={disableDeleteButton}
                    onClick={handleDelete}
                    autoFocus
                    sx={{ color: 'red' }}
                    label="Delete"
                >
                    {<DeleteIcon />}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
