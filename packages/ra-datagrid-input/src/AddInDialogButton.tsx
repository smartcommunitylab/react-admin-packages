import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Button as MuiButton,
    styled,
} from '@mui/material';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import {
    Button,
    Datagrid,
    FilterButton,
    FilterPayload,
    Identifier,
    ListBase,
    ListView,
    RaRecord,
    SortPayload,
    useGetResourceLabel,
    useListContext,
    useResourceContext,
    useTranslate,
    useUnselectAll,
} from 'react-admin';
import { UseQueryOptions } from '@tanstack/react-query';

export const AddInDialogButton = <RecordType extends RaRecord = any>(
    props: AddInDialogButtonProps<RecordType>
) => {
    const defaultResource = useResourceContext();

    const {
        dialogChildren,
        dialogTitle: dialogTitleProp,
        dialogFilter,
        dialogFilterDefaultValues,
        dialogQueryOptions,
        sort,
        resource = defaultResource,
        ...rest
    } = props;

    const [open, setOpen] = useState(false);
    const unselectAll = useUnselectAll(resource);
    const storeKey = resource + '-dialog.listParams';
    const translate = useTranslate();
    const getResourceLabel = useGetResourceLabel();

    const defaultDialogTitle = translate('ra.message.bulk_update_title', {
        name: getResourceLabel(resource, 2),
        smart_count: 1,
    });
    const dialogTitle = dialogTitleProp
        ? translate(dialogTitleProp, { _: dialogTitleProp })
        : defaultDialogTitle;

    const handleOpen = () => {
        unselectAll();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        unselectAll();
    };

    return (
        <>
            <Button
                label="ra.action.add"
                onClick={handleOpen}
                className={AddInDialogButtonClasses.button}
            >
                <AddCircleOutlineIcon />
            </Button>

            <AddDialog
                fullWidth={true}
                maxWidth="lg"
                onClose={handleClose}
                aria-labelledby="dialog-title"
                open={open}
                className={AddInDialogButtonClasses.dialog}
            >
                <div className={AddInDialogButtonClasses.header}>
                    <DialogTitle
                        id="dialog-title"
                        className={AddInDialogButtonClasses.title}
                    >
                        {dialogTitle}
                    </DialogTitle>

                    <IconButton
                        className={AddInDialogButtonClasses.closeButton}
                        aria-label={translate('ra.action.close')}
                        title={translate('ra.action.close')}
                        onClick={handleClose}
                        size="small"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>

                <ListBase
                    filter={dialogFilter}
                    filterDefaultValues={dialogFilterDefaultValues}
                    queryOptions={dialogQueryOptions}
                    sort={sort}
                    storeKey={storeKey}
                >
                    <DialogBody
                        {...rest}
                        dialogChildren={dialogChildren}
                        onClose={handleClose}
                    />
                </ListBase>
            </AddDialog>
        </>
    );
};

const DialogBody = <RecordType extends RaRecord = any>(
    props: DialogBodyProps<RecordType>
) => {
    const {
        dialogChildren,
        dialogFilters,
        onClickAddButton,
        onClose,
        isDialogRowSelectable,
    } = props;
    const { data, selectedIds } = useListContext<RecordType>();
    const [selectedRecords, setSelectedRecords] = useState<RecordType[]>([]);
    const translate = useTranslate();

    useEffect(() => {
        if (selectedIds && data) {
            const previousSelectedIds = selectedRecords.map(
                (record: RecordType) => record.id
            );

            const addedIds = selectedIds.filter(
                (id: Identifier) => !previousSelectedIds.includes(id)
            );
            const removedIds = previousSelectedIds.filter(
                (id: Identifier) => !selectedIds.includes(id)
            );

            const addedRecords = data.filter((record: RecordType) =>
                addedIds.includes(record.id)
            );
            const removedRecords = selectedRecords.filter(
                (record: RecordType) => removedIds.includes(record.id)
            );

            const updatedSelectedRecords = [
                ...selectedRecords,
                ...addedRecords,
            ].filter((record: RecordType) => !removedRecords.includes(record));

            setSelectedRecords(() => updatedSelectedRecords);
        }
    }, [selectedIds]);

    const onClickAddButtonWrapper = () => {
        onClickAddButton([...selectedRecords]);
        onClose();
    };

    return (
        <>
            <DialogContent sx={{ pt: dialogFilters ? 0 : 8 }}>
                <ListView
                    actions={
                        Array.isArray(dialogFilters) ? <FilterButton /> : false
                    }
                    filters={dialogFilters}
                    title={<></>}
                >
                    <Datagrid
                        rowClick="toggleSelection"
                        bulkActionButtons={<></>}
                        sx={{
                            '& .RaDatagrid-headerCell': {
                                top: theme => {
                                    return dialogFilters
                                        ? 0
                                        : theme.spacing(-8);
                                },
                            },
                        }}
                        isRowSelectable={isDialogRowSelectable}
                    >
                        {Array.isArray(dialogChildren) &&
                            dialogChildren.map((child, index) =>
                                React.cloneElement(child, { key: index })
                            )}
                        {!Array.isArray(dialogChildren) && dialogChildren}
                    </Datagrid>
                </ListView>
            </DialogContent>

            <DialogActions>
                <MuiButton
                    onClick={onClickAddButtonWrapper}
                    startIcon={<AddCircleOutlineIcon />}
                    disabled={selectedIds.length === 0}
                >
                    {translate('ra.action.add')}
                </MuiButton>
            </DialogActions>
        </>
    );
};

export type DialogBodyProps<RecordType extends RaRecord = any> = {
    onClickAddButton: (records: RecordType[]) => void;
    isDialogRowSelectable: (record: RecordType) => boolean;
    dialogChildren: ReactNode;
    onClose: () => void;
    dialogFilters?: ReactElement | ReactElement[];
};

export type AddInDialogButtonProps<RecordType extends RaRecord = any> =
    OpenAddInDialogButtonProps<RecordType> & {
        onClickAddButton: (records: RecordType[]) => void;
        isDialogRowSelectable: (record: RecordType) => boolean;
        resource?: string;
        sort?: SortPayload;
    };

export type OpenAddInDialogButtonProps<RecordType extends RaRecord = any> = {
    dialogChildren?: ReactNode;
    dialogTitle?: string;
    dialogFilter?: FilterPayload;
    dialogFilters?: ReactElement | ReactElement[];
    dialogFilterDefaultValues?: object;
    dialogQueryOptions?: UseQueryOptions<{
        data: RecordType[];
        total?: number;
        pageInfo?: {
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
        };
    }> & { meta?: any };
};

const PREFIX = 'RaAddInDialogButton';

export const AddInDialogButtonClasses = {
    button: `${PREFIX}-button`,
    dialog: `${PREFIX}-dialog`,
    header: `${PREFIX}-header`,
    title: `${PREFIX}-title`,
    closeButton: `${PREFIX}-close-button`,
};

const AddDialog = styled(Dialog, {
    overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
    [`& .${AddInDialogButtonClasses.title}`]: {
        padding: theme.spacing(0),
    },
    [`& .${AddInDialogButtonClasses.header}`]: {
        padding: theme.spacing(2, 3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    [`& .${AddInDialogButtonClasses.closeButton}`]: {
        height: 'fit-content',
    },
}));
