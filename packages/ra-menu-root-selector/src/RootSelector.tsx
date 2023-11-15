import React, { useEffect, useState } from 'react';
import { useDataProvider, GetListParams } from 'react-admin';
import { Box, MenuItem, Menu, ListItemText } from '@mui/material';
import { useRootSelectorContext } from './RootSelectorContext';

export type RootSelectorParams = {
    source?: string;
};
export const RootSelector = (props: RootSelectorParams) => {
    const { source = 'id' } = props;
    const { resource, resourceContext, selectResourceContext } =
        useRootSelectorContext();
    const resourceSelected = resourceContext();
    const dataProvider = useDataProvider();
    const [resources, setResource] = useState<any[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddTag = (resource: any) => {
        setAnchorEl(null);
        console.log(resource['id']);
        selectResourceContext(resource);
    };

    let params: GetListParams = {
        pagination: { page: 0, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
        filter: undefined,
    };

    useEffect(() => {
        dataProvider.getList(resource, params).then((data: any) => {
            if (data && data.data) {
                console.log(data);
                setResource(data.data);
            }
        });
    }, [resourceSelected]);
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
                            onClick={() => handleAddTag(resource)}
                        >
                            <ListItemText>{resource[source]} </ListItemText>
                        </MenuItem>
                    ))}
            </Menu>
        </>
    );
};

export default RootSelector;
