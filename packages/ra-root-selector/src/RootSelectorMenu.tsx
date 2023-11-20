import * as React from 'react';
import { ReactNode, useEffect, useState, MouseEvent } from 'react';
import { useDataProvider, SortPayload, useTranslate } from 'react-admin';
import { Box, Button, MenuItem, Menu, ListItemText } from '@mui/material';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useRootSelector } from './RootSelectorContext';

const defaultIcon = <GroupWorkIcon />;

export type RootSelectorMenuParams = {
    source?: string;
    maxResults?: number;
    sort?: SortPayload;
    filter?: any;
    meta?: any;
    label?: string;
    icon?: ReactNode;
    showSelected?: boolean;
};

export const RootResourceSelectorMenu = (props: RootSelectorMenuParams) => {
    const {
        source = 'id',
        maxResults = 100,
        sort = { field: 'id', order: 'ASC' },
        filter,
        meta,
        label,
        icon = defaultIcon,
        showSelected = source !== 'id',
    } = props;
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const { resource, context, selectContext } = useRootSelector();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [records, setRecords] = useState<any[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>();

    const handleOpen = (event: MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const handleClick = (resource: any) => {
        setAnchorEl(null);
        selectContext(resource);
    };

    const isSelected = (record: any) => {
        // eslint-disable-next-line eqeqeq
        return context && record && 'id' in record && record.id == context;
    };

    //note: do NOT add function definitions or variables from props to dependencies, it will end in a loop
    useEffect(() => {
        const params = {
            pagination: { page: 1, perPage: maxResults },
            sort,
            filter,
            meta,
        };

        dataProvider.getList(resource, params).then((res: any) => {
            if (res.data) {
                //store list as is
                setRecords(res.data);

                //extract selected if present, or undefined
                setSelectedRecord(res.data.find(isSelected));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resource, context]);

    const getMenuLabel = () => {
        if (label) {
            return translate(label);
        }

        if (showSelected && selectedRecord) {
            return selectedRecord[source] || selectedRecord.id;
        }

        return translate(resource);
    };
    const getRowLabel = (r: any) => {
        if (r && source in r) {
            return r[source];
        }

        return r.id;
    };

    return (
        <Box className="RaRootSelectorMenu" component="span">
            <Box>
                <Button
                    color="inherit"
                    variant="text"
                    aria-controls="simple-menu"
                    aria-label=""
                    aria-haspopup="true"
                    onClick={handleOpen}
                    startIcon={icon}
                    endIcon={<ExpandMoreIcon fontSize="small" />}
                >
                    {getMenuLabel()}
                </Button>
            </Box>
            <Menu
                id="root-selector-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {records?.map(record => (
                    <MenuItem
                        key={record.id}
                        onClick={() => handleClick(record)}
                        selected={isSelected(record)}
                    >
                        <ListItemText>{getRowLabel(record)} </ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default RootResourceSelectorMenu;
