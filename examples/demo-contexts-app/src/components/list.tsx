import {
    Datagrid,
    Loading,
    TextField,
    Error,
    useList,
    ListContextProvider,
    Pagination,
    GetListParams,
} from 'react-admin';
import { useSearch } from '@dslab/ra-search-bar';
import { useEffect, useState } from 'react';

export const SearchList = () => {
    const { params, setParams, provider } = useSearch();
    console.log('context', params);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        provider
            .search(params, {} as GetListParams)
            .then(({ data, total }) => {
                setResults(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [provider, params]);

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
