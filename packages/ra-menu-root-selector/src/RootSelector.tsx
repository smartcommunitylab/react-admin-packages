import React, { useEffect, useMemo, useState } from 'react';
import { useDataProvider, GetListParams, SortPayload } from 'react-admin';
import { Box, MenuItem, Menu, ListItemText } from '@mui/material';
import { useRootSelectorContext } from './RootSelectorContext';

export type RootSelectorParams = {
    source?: string;
    maxResults?: number;
    sort?: SortPayload;
    filter?: any;
    meta?: any;
};

export const RootResourceSelector = (props: RootSelectorParams) => {
    const {
        source = 'id',
        maxResults = 100,
        sort = { field: 'id', order: 'ASC' },
        filter,
        meta,
    } = props;
    const { resource, context, selectContext } = useRootSelectorContext();
    const resourceSelected = context;
    const dataProvider = useDataProvider();
    const [resources, setResources] = useState<any[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (resource: any) => {
        setAnchorEl(null);
        console.log(resource['id']);
        selectContext(resource);
    };

    const params: GetListParams = useMemo(
        () => ({
            pagination: { page: 0, perPage: maxResults },
            sort,
            filter,
            meta,
        }),
        [maxResults, sort, filter, meta]
    );

    useEffect(() => {
        dataProvider.getList(resource, params).then((res: any) => {
            if (res.data) {
                setResources(res.data);
            }
        });
    }, [dataProvider, params, resource, resourceSelected]);

    let label = resourceSelected;
    if (resources) {
        const foundRes = resources.find(res => res.id === resourceSelected);
        if (foundRes) {
            label = foundRes[source];
        }
    }

    return (
        <>
            <Box>
                <div onClick={handleOpen}>{label}</div>
            </Box>
            <Menu
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                {resources &&
                    resources.map(resource => (
                        <MenuItem
                            key={resource['id']}
                            onClick={() => handleClick(resource)}
                        >
                            <ListItemText>{resource[source]} </ListItemText>
                        </MenuItem>
                    ))}
            </Menu>
        </>
    );
};

export default RootResourceSelector;
