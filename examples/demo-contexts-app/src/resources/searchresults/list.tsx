import {
    Datagrid,
    Loading,
    TextField,
    useDataProvider,
    Error,
    useList,
    ListContextProvider,
    Pagination,
} from 'react-admin';
import {
    List as MuiList
} from '@mui/material';
import { useSearch } from '@dslab/ra-search-bar';
import { useEffect, useState } from 'react';

export const SearchList = () => {
    const { params, setParams, provider } = useSearch();
    console.log('context', params);

    const dataProvider = useDataProvider();
    const [results, setResults] = useState<[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        //TODO do not call search if there are no params?
        //TODO use provider or useDataProvider?
        dataProvider.search(params)
            .then(({ data }) => {
                setResults(data.content);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [dataProvider, params]);

    const listContext = useList({ data: results, isLoading: loading });

    if (loading) return <Loading />;
    if (error) return <Error />;
    if (!results) return null;

    console.log('results', results);

    return (
        <ListContextProvider value={listContext}>
            <Datagrid expand={<></>} bulkActionButtons={false}>
                <TextField source="type" />
                <TextField source="metadata.name" />
                <TextField source="kind" />
                <TextField source="metadata.description" />
                <TextField source="metadata.updated" />
            </Datagrid>
            <Pagination />
        </ListContextProvider>
    );
};
