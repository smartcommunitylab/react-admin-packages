import React, { ReactElement } from 'react';
import {
    Button,
    ButtonProps,
    Exporter,
    RaRecord,
    fetchRelatedRecords,
    useDataProvider,
    useRecordContext,
    useResourceContext,
} from 'react-admin';
import DownloadIcon from '@mui/icons-material/GetApp';
import { toYaml, toJson } from './utils';
import downloadYaml from './downloadYaml';
import downloadJson from './downloadJson';

const defaultIcon = <DownloadIcon />;

export const ExportRecordButton = (props: ExportRecordButtonProps) => {
    const {
        label = 'ra.action.export',
        icon = defaultIcon,
        language = 'json',
        exporter,
        record: recordFromProps,
        resource: resourceFromProps,
        filename,
        onClick,
        ...rest
    } = props;
    const dataProvider = useDataProvider();
    const resourceContext = useResourceContext();
    const recordContext = useRecordContext();

    const resource = resourceFromProps || resourceContext;
    const record = recordFromProps || recordContext;
    const isLoading = !record;

    const handleExport = e => {
        if (!isLoading && record) {
            if (exporter) {
                exporter(
                    [record],
                    fetchRelatedRecords(dataProvider),
                    dataProvider,
                    resource
                );
            } else {
                const name = filename || `${resource}-${record.id}`;
                if (language === 'yaml') {
                    downloadYaml(toYaml(record), name);
                } else if (language === 'json') {
                    downloadJson(toJson(record), name);
                }
            }
        }

        e.stopPropagation();

        if (typeof onClick === 'function') {
            onClick(e);
        }
    };

    return (
        <Button label={label} onClick={handleExport} {...rest}>
            {icon}
        </Button>
    );
};

export type ExportRecordButtonProps<RecordType extends RaRecord = any> =
    ButtonProps & {
        /**
         * (Optional) language for export. Defaults to `json`
         */
        language?: 'json' | 'yaml';
        /**
         * (Optional) exporter to override the internal one.
         */
        exporter?: Exporter;
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
         * (Optional) filename to use for export. Defaults to `[resource]-[id]`
         */
        filename?: string;
    };
