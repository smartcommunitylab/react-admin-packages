import {
    Datagrid,
    Loading,
    TextField,
    useDataProvider,
    Error,
} from 'react-admin';
import {
    List
} from '@mui/material';
import { useSearch, SearchResults } from '@dslab/ra-search-bar';
import { useEffect, useState } from 'react';

export const SearchList = () => {
    const { params, setParams, provider } = useSearch();
    console.log('context', params);
    const dataProvider = useDataProvider();
    const [results, setResults] = useState<[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
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

    if (loading) return <Loading />;
    if (error) return <Error />;
    if (!results) return null;

    console.log('results', results);

    return (
        <List>
            {/* <Datagrid>
                {results.map(res => {return (
                    <TextField source="id" key={res.id} />
                )})}
            </Datagrid> */}
            {results.map(res => {return (
                <span key={res.id}>
                    {res.id}
                </span>
            )})}
        </List>
    );
};
