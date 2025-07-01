import React, { Fragment, useState } from 'react';
import {
    Button,
    Confirm,
    DeleteWithConfirmButtonProps,
    RaRecord,
    SimpleForm,
    TextInput,
    required,
    useDeleteWithConfirmController,
    useRecordContext,
    useResourceContext,
    useTranslate,
} from 'react-admin';
import { singularize, humanize } from 'inflection';

import ActionDelete from '@mui/icons-material/Delete';
import { DialogContentText } from '@mui/material';

const defaultIcon = <ActionDelete />;

/**
 * Delete with confirm button dialog
 *
 * @example
 * <DeleteButtonDialog
 *     confirmTitle="Item title"
 *     redirect="url to redirect after delete"
 * />
 */

export const DeleteWithDialogButton = <RecordType extends RaRecord = any>(
    props: DeleteWithDialogButtonProps<RecordType>
) => {
    const {
        className,
        confirmTitle = 'ra.message.delete_title',
        icon = defaultIcon,
        label = 'ra.action.delete',
        mutationMode = 'pessimistic',
        onClick,
        redirect = 'list',
        titleTranslateOptions: titleTranslateOptionsFromProps = {},
        contentTranslateOptions: contentTranslateOptionsFromProps = {},
        mutationOptions,
        color = 'error',
        source = 'id',
        ...rest
    } = props;
    const translate = useTranslate();
    const resource = useResourceContext(props);
    const record = useRecordContext();

    const {
        open,
        isLoading,
        handleDialogOpen,
        handleDialogClose,
        handleDelete,
    } = useDeleteWithConfirmController({
        record,
        redirect,
        mutationMode,
        onClick,
        mutationOptions,
        resource,
    });

    const [value, setValue] = useState<string>();

    const handleConfirm = e => {
        // eslint-disable-next-line eqeqeq
        if (record && source in record && value && record[source] == value) {
            handleDelete(e);
        }
    };

    const handleUpdate = (input: string) => {
        setValue(input);
    };

    const getConfirmColor = () => {
        // eslint-disable-next-line eqeqeq
        if (record && source in record && value && record[source] == value) {
            return 'primary';
        }

        return 'warning';
    };

    const name = translate(`resources.${resource}.forcedCaseName`, {
        smart_count: 1,
        _: humanize(
            translate(`resources.${resource}.name`, {
                smart_count: 1,
                _: singularize(resource),
            }),
            true
        ),
    });

    const titleTranslateOptions = {
        name,
        id: record.id,
        recordRepresentation: record.id,
        ...titleTranslateOptionsFromProps,
    };

    const contentTranslateOptions = {
        name,
        id: record.id,
        recordRepresentation: record.id,
        ...contentTranslateOptionsFromProps,
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
            <Confirm
                isOpen={open}
                loading={isLoading}
                title={confirmTitle}
                content={
                    <DeleteWithConfirmDialog
                        {...props}
                        onUpdate={handleUpdate}
                        titleTranslateOptions={titleTranslateOptions}
                        contentTranslateOptions={contentTranslateOptions}
                    />
                }
                confirmColor={getConfirmColor()}
                titleTranslateOptions={titleTranslateOptions}
                contentTranslateOptions={contentTranslateOptions}
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
        </Fragment>
    );
};

export interface DeleteWithDialogButtonProps<
    RecordType extends RaRecord = any,
    MutationOptionsError = unknown
> extends DeleteWithConfirmButtonProps {
    source?: string;
}

export const DeleteWithConfirmDialog = (
    props: DeleteWithDialogButtonProps & { onUpdate: (value: string) => void }
) => {
    const {
        source = 'id',
        confirmContent = 'ra.message.delete_content',
        onUpdate,
        contentTranslateOptions,
    } = props;
    const record = useRecordContext(props);
    const translate = useTranslate();

    const isValid = (input: any) => {
        //always update callback
        onUpdate((input || '').toString());

        if (!record || !(source in record)) {
            return 'ra.notification.bad_item';
        }

        if (!input) {
            return 'ra.validation.required';
        }

        // eslint-disable-next-line eqeqeq
        if (input != record[source]) {
            return 'ra.message.invalid_form';
        }

        return undefined;
    };

    const validateInput = [required(), isValid];

    return (
        <>
            {typeof confirmContent === 'string' ? (
                <DialogContentText>
                    {translate(confirmContent, contentTranslateOptions)}
                </DialogContentText>
            ) : (
                confirmContent
            )}

            <SimpleForm toolbar={false} mode="onChange" reValidateMode="onBlur">
                <TextInput label={source} source={source} disabled fullWidth />

                <TextInput
                    label="ra.action.confirm"
                    source="_value"
                    validate={validateInput}
                    fullWidth
                />
            </SimpleForm>
        </>
    );
};
