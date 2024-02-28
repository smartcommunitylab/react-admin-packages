import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

import { useSearch } from './SearchContext';
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
} from '@mui/material';
import { useState } from 'react';
import {
    Form,
    RecordContextProvider,
    TextInput,
    useRecordContext,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { SearchFilter } from './SearchProvider';
import { InputProps } from 'ra-core';

const getEntries = (o, prefix = '') =>
    Object.entries(o).flatMap(([k, v]) =>
        Object(v) === v
            ? getEntries(v, `${prefix}${k}.`)
            : [[`${prefix}${k}`, v]]
    );

const parseInput = (searchBarInput: string, filterInputs: SearchFilter[]) => {
    let newInput = searchBarInput;
    filterInputs.forEach(filter => {
        if (!searchBarInput.includes(filter.field)) {
            newInput += ` ${filter.filter}`;
        } else {
            /************************************************************
             * TODO modificare per usare funzione parse
             ************************************************************
             */
            //es. foo metadata.name:"pippo"
            let startIndex = newInput.indexOf(filter.field + ':"');
            let endIndex = newInput.indexOf(
                '"',
                startIndex + `${filter.field}:"`.length
            );
            newInput = newInput.replace(
                newInput.substring(startIndex, endIndex + 1),
                `${filter.field}:"${filter.value}"`
            );
        }
    });

    console.log('searchbar updated q:', newInput);
    return newInput.trim();
};

const extractQ = (input: string) => {
    return input.replace(/[^\s:"]+(:"){1}[^:]+"\s?/g, '');
};

export type SearchBarParams = {
    hintText?: string;
    to?: string;
    filters?:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
        | undefined;
};

export const SearchBar = (props: SearchBarParams) => {
    const { hintText = 'Search', to, filters } = props;
    const { params, setParams, provider } = useSearch();
    const [showFilters, setShowFilters] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');
    const navigate = useNavigate();
    const [record, setRecord] = useState({ id: '1', q: '' });

    const handleClickShowFilters = () => setShowFilters(show => !show);

    //TODO
    //impedire ricerca vuota tramite search
    //quando dopo una ricerca si fa clear resettare gli input ma non il context
    //includere inputValue in record
    //usare funzioni di format per scrivere dalla barra ai filtri
    //mentre iteriamo sui filtri, costruire anche oggetto defaultValues per il reset

    let conversionMap = {}; //{"metadata.name": {parse: f, format: f}}

    function isInputProps(object: any): object is InputProps {
        return 'source' in object && 'format' in object && 'parse' in object;
    }

    const cloneFilter = (
        element: React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
        >
    ) => {
        if (element !== undefined) {
            if (isInputProps(element.props)) {
                conversionMap[element.props.source] = {
                    parse: element.props.parse,
                    format: element.props.format,
                };
                return React.cloneElement(element, {
                    format: undefined,
                    parse: undefined,
                });
            }
            return React.cloneElement(element);
        }
        return undefined;
    };

    let newFilters = undefined;

    if (filters !== undefined) {
        if (Array.isArray(filters)) {
            newFilters = filters.map(filter => cloneFilter(filter));
        } else {
            newFilters = cloneFilter(filters);
        }
    }

    const handleClickSearch = (filterInputs: any) => {
        console.log('searchbar filterInputs ', filterInputs);
        let fq: SearchFilter[] = [];

        //build fq using parse functions defined on filters
        if (filterInputs !== undefined) {
            const flattenedInputs = Object.fromEntries(
                getEntries(filterInputs)
            );

            fq = Object.keys(conversionMap)
                .map(source => {
                    const value = flattenedInputs[source];
                    const parse = conversionMap[source].parse;
                    if (value !== undefined) {
                        return {
                            field: source,
                            value: value,
                            filter: parse(value),
                        };
                    }
                    return null;
                })
                .filter(value => value !== null);
        }

        //update searchbar value
        setInputValue(parseInput(inputValue, fq));

        //write input values into context
        setParams({ q: extractQ(inputValue), fq: fq });
        //close filter box
        setShowFilters(false);
        if (to) {
            navigate(to);
        }
    };

    return (
        <Box sx={{ marginRight: '50px' }}>
            <RecordContextProvider value={record}>
                <Stack>
                    <Form
                    //TODO
                    // defaultValues={{
                    //     metadata: { name: '', description: '' },
                    //     type: '',
                    // }}
                    >
                        <div style={{ position: 'relative' }}>
                            <ActualSearchBar
                                hintText={hintText}
                                value={inputValue}
                                setValue={setInputValue}
                                handleEnter={handleClickSearch}
                                handleClickShowFilters={handleClickShowFilters}
                            />
                            <FilterBox
                                showFilters={showFilters}
                                filters={newFilters}
                                handleClickSearch={handleClickSearch}
                            />
                        </div>
                    </Form>
                </Stack>
            </RecordContextProvider>
        </Box>
    );
};

const ActualSearchBar = (props: any) => {
    const { hintText, value, setValue, handleEnter, handleClickShowFilters } =
        props;

    const formContext = useFormContext();

    const handleClickClear = () => {
        setValue('');
        //NOTE: works only if defaultValues are provided to Form or to reset()
        formContext.reset();
    };

    // return (
    //     <TextInput
    //         source="q"
    //         variant="outlined"
    //         placeholder={hintText}
    //         onKeyDown={e => {
    //             if (e.key === 'Enter') handleEnter();
    //         }}
    //     />
    // );

    return (
        <FormControl variant="outlined">
            <OutlinedInput
                id="search-input"
                type="text"
                placeholder={hintText}
                sx={{
                    backgroundColor: 'white',
                    width: '50ch',
                }}
                value={value}
                onChange={event => {
                    setValue(event.target.value);
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter' && value) handleEnter();
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="cancel search input"
                            onClick={handleClickClear}
                            edge="end"
                        >
                            <ClearIcon />
                        </IconButton>
                        <IconButton
                            aria-label="toggle filters visibility"
                            onClick={handleClickShowFilters}
                            edge="end"
                        >
                            <TuneIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

const FilterBox = (props: any) => {
    const { showFilters, filters, handleClickSearch } = props;
    const formContext = useFormContext();

    return (
        <Box>
            {showFilters && (
                <Stack
                    sx={{
                        backgroundColor: 'white',
                        position: 'absolute',
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid darkgray',
                    }}
                >
                    {filters}
                    <Button
                        variant="text"
                        aria-controls="search-button"
                        aria-label=""
                        //TODO disable se input vuoti
                        onClick={() =>
                            handleClickSearch(formContext.getValues())
                        }
                    >
                        Search
                    </Button>
                </Stack>
                // <Grid
                //     container
                //     sx={{ border: 1, backgroundColor: 'white' }}
                // >
                //     <Grid
                //         item
                //         xs={12}
                //         sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                //     >
                //         <div>some filters here</div>
                //     </Grid>
                //     <Grid item xs={9}>
                //         <div></div>
                //     </Grid>
                //     <Grid item xs={3}>
                //         <Button
                //             variant="text"
                //             aria-controls="search-button"
                //             aria-label=""
                //             onClick={handleClickSearch}
                //         >
                //             Search
                //         </Button>
                //     </Grid>
                // </Grid>
            )}
        </Box>
    );
};

export default SearchBar;
