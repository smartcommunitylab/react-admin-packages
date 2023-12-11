import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
    CommonInputProps,
    Datagrid,
    Identifier,
    Labeled,
    ListContextProvider,
    ListControllerResult,
    Pagination,
    RaRecord,
    RecordRepresentation,
    SortPayload,
    TopToolbar,
    UseListValue,
    useChoicesContext,
    useInput,
    useList,
    useRecordSelection,
} from 'react-admin';
import {
    AddInDialogButton,
    OpenAddInDialogButtonProps,
} from './AddInDialogButton';
import { BulkRemoveButton } from './BulkRemoveButton';
import { RemoveButton } from './RemoveButton';

export const DatagridArrayInput = <RecordType extends RaRecord = RaRecord>(
    props: DatagridArrayInputProps<RecordType>
) => {
    const {
        children,
        dialogChildren = children,
        resource: resourceProp,
        source: sourceProp,
        sort,
        label,
        dialogTitle,
        dialogFilters,
        dialogFilter,
        dialogFilterDefaultValues,
        dialogQueryOptions,
    } = props;

    const {
        selectedChoices,
        isLoading,
        isFetching,
        error,
        source,
        resource,
        page,
        perPage,
    } = useChoicesContext({
        resource: resourceProp,
        source: sourceProp,
    });

    const [data, setData] = useState<RecordType[] | undefined>(undefined);
    const [selectedIds, { select, toggle, clearSelection, unselect }] =
        useRecordSelection<RecordType>(`${resource}-${source}`);

    const { field, isRequired } = useInput({
        source,
    });

    const listProps: UseListValue<RecordType> = useList({
        data,
        error,
        isFetching,
        isLoading,
        resource,
        page,
        perPage,
        sort,
    });

    const overriddenListProps: ListControllerResult<RecordType> = {
        ...listProps,
        selectedIds,
        onSelect: select,
        onToggleItem: toggle,
        onUnselectItems: clearSelection,
    };

    //TODO refactor to handle only initial set: manipulating the local data should happen in the component
    useEffect(() => {
        if (selectedChoices) {
            setData(selectedChoices);

            //find the IDs of rows that have been removed and unselect them
            const rowIdsToUnselect = selectedIds.filter(
                id => !selectedChoices.some(obj => obj.id === id)
            );
            unselect(rowIdsToUnselect);

            //move to the first page if the current page is empty
            const numberOfPages = Math.ceil(
                selectedChoices.length / overriddenListProps.perPage
            );
            if (
                overriddenListProps.page !== 1 &&
                overriddenListProps.page > numberOfPages
            ) {
                overriddenListProps.setPage(1);
            }
        }
    }, [selectedChoices]);

    const handleBulkRemoveButtonClick = useCallback(
        (selectedIds: Identifier[]) => {
            const array = data
                ? data.filter(obj => !selectedIds.includes(obj.id))
                : [];

            field.onChange(array.map(obj => obj.id));
        },
        [field]
    );

    const handleRemoveButtonClick = useCallback(
        (selectedId: Identifier) => {
            const array = data ? data.filter(obj => selectedId !== obj.id) : [];
            field.onChange(array.map(obj => obj.id));
        },
        [field]
    );

    const handleAddButtonClick = useCallback(
        (records: RecordType[]) => {
            //filter records to remove duplicates
            const sanitizedRecords = records.filter(
                obj => data && !data.some(o => o.id === obj.id)
            );

            const array = data ? [...data, ...sanitizedRecords] : [...records];

            field.onChange(array.map(obj => obj.id));
        },
        [field]
    );

    // build a default representation with proper headers
    const defaultChildren = (
        <DefaultRepresentation
            label={resource}
            source={resource}
            sortable={false}
        />
    );

    return (
        <Labeled
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
            fullWidth
        >
            <>
                <TopToolbar>
                    <AddInDialogButton
                        onClickAddButton={handleAddButtonClick}
                        sort={sort}
                        resource={resource}
                        dialogTitle={dialogTitle}
                        dialogFilters={dialogFilters}
                        dialogFilter={dialogFilter}
                        dialogFilterDefaultValues={dialogFilterDefaultValues}
                        dialogQueryOptions={dialogQueryOptions}
                        dialogChildren={dialogChildren ?? defaultChildren}
                    />
                </TopToolbar>

                {!isLoading && (
                    <ListContextProvider value={overriddenListProps}>
                        <Datagrid
                            bulkActionButtons={
                                <BulkRemoveButton
                                    onRemove={handleBulkRemoveButtonClick}
                                />
                            }
                        >
                            {children ?? defaultChildren}

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <RemoveButton
                                    onRemove={handleRemoveButtonClick}
                                />
                            </div>
                        </Datagrid>

                        {data &&
                            data.length > 0 &&
                            listProps.data?.length > 0 && (
                                <Pagination rowsPerPageOptions={[]} />
                            )}
                    </ListContextProvider>
                )}
            </>
        </Labeled>
    );
};

export type DatagridArrayInputProps<RecordType extends RaRecord = any> =
    OpenAddInDialogButtonProps<RecordType> &
        Omit<CommonInputProps, 'source'> & {
            children?: ReactNode;
            source?: string;
            sort?: SortPayload;
        };

const DefaultRepresentation = (props: {
    label: string;
    source: string;
    sortable: boolean;
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label, source, sortable } = props;
    return <RecordRepresentation />;
};
