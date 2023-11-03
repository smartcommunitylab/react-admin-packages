import React, { useCallback } from 'react';
import {
    Button,
    ButtonProps,
    fetchRelatedRecords,
    useDataProvider,
    useNotify,
    useListContext,
    SortPayload,
    Exporter,
    FilterPayload,
    useResourceContext,
    GetListParams,
} from 'react-admin';
import PropTypes from 'prop-types';
import DownloadIcon from '@mui/icons-material/GetApp';

/**
 * @author SmartCommunityLab
 * @author Marmelab
 */
export const ExportAllButton = (props: ExportAllButtonProps) => {
    const {
        maxResults = 10000,
        onClick,
        label = 'ra.action.export',
        icon = defaultIcon,
        exporter: customExporter,
        meta,
        perPage: customPerPage,
        ...rest
    } = props;
    const {
        filter,
        filterValues,
        sort,
        exporter: exporterFromContext,
        total,
        perPage: perPageFromContext,
    } = useListContext(props);

    const resource = useResourceContext(props);
    const exporter = customExporter || exporterFromContext;
    const perPage = customPerPage || perPageFromContext;
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const handleClick = useCallback(
        event => {
            if (!exporter) {
                return;
            }

            if (!total) {
                notify('ra.message.error', {
                    type: 'error',
                });
            }

            const promises: Promise<{
                data: any[];
                params: GetListParams;
            }>[] = [];

            const numberOfElements = maxResults < total ? maxResults : total;
            const numberOfPages = Math.ceil(numberOfElements / perPage);

            for (let page = 1; page <= numberOfPages; page++) {
                const params: GetListParams = {
                    sort,
                    filter: filter
                        ? { ...filterValues, ...filter }
                        : filterValues,
                    pagination: {
                        page: page,
                        perPage: perPage,
                    },
                    meta,
                };

                promises.push(
                    dataProvider
                        .getList(resource, params)
                        .then(({ data }) => {
                            return Promise.resolve({ data, params });
                        })
                        .catch(error => {
                            return Promise.reject(
                                new Error('ra.notification.data_provider_error')
                            );
                        })
                );
            }

            Promise.all(promises)
                .then((responses: { data: any[]; params: GetListParams }[]) => {
                    responses.sort(
                        (a, b) =>
                            a.params.pagination.page - b.params.pagination.page
                    );

                    let data = responses.map(response => response.data);
                    if (data.length > maxResults) {
                        data = data.slice(0, maxResults);
                    }

                    exporter &&
                        exporter(
                            data,
                            fetchRelatedRecords(dataProvider),
                            dataProvider,
                            resource
                        );
                })
                .catch(error => {
                    console.log(error);
                    notify('ra.notification.data_provider_error', {
                        type: 'error',
                    });
                });

            if (typeof onClick === 'function') {
                onClick(event);
            }
        },
        [
            dataProvider,
            exporter,
            filter,
            filterValues,
            maxResults,
            notify,
            onClick,
            resource,
            sort,
            meta,
            perPage,
            total,
        ]
    );

    return (
        <Button
            onClick={handleClick}
            label={label}
            disabled={total === 0}
            {...sanitizeRestProps(rest)}
        >
            {icon}
        </Button>
    );
};

const defaultIcon = <DownloadIcon />;

const sanitizeRestProps = ({
    filterValues,
    resource,
    ...rest
}: Omit<
    ExportAllButtonProps,
    'sort' | 'maxResults' | 'label' | 'exporter' | 'meta' | 'perPage'
>) => rest;

interface Props {
    exporter?: Exporter;
    filterValues?: FilterPayload;
    icon?: JSX.Element;
    label?: string;
    maxResults?: number;
    onClick?: (e: Event) => void;
    resource?: string;
    sort?: SortPayload;
    meta?: any;
    perPage?: number;
}

export type ExportAllButtonProps = Props & ButtonProps;

ExportAllButton.propTypes = {
    exporter: PropTypes.func,
    filterValues: PropTypes.object,
    label: PropTypes.string,
    maxResults: PropTypes.number,
    resource: PropTypes.string,
    sort: PropTypes.exact({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    icon: PropTypes.element,
    meta: PropTypes.any,
    perPage: PropTypes.number,
};
