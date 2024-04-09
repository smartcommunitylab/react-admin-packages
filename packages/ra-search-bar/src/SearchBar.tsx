import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

import { useSearch } from './SearchContext';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField as MuiTextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Form, RecordContextProvider } from 'react-admin';
import { useFormContext, useFormState, useController } from 'react-hook-form';
import { SearchFilter } from './SearchProvider';
import { InputProps } from 'ra-core';

const getEntries = (o, prefix = '') =>
    Object.entries(o).flatMap(([k, v]) =>
        Object(v) === v && !Array.isArray(v)
            ? getEntries(v, `${prefix}${k}.`)
            : [[`${prefix}${k}`, v]]
    );

function unflatten(object, keys, value) {
    const last = keys.pop();
    keys.reduce((o, k) => (o[k] = o[k] || {}), object)[last] = value;
}

const parseInput = (
    searchBarInput: string,
    filterInputs: SearchFilter[],
    filterSeparator: string
) => {
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
            let startIndex = newInput.indexOf(filter.field);
            let endIndex = newInput.indexOf(
                '"',
                startIndex + `${filter.field}${filterSeparator}"`.length
            );
            newInput = newInput.replace(
                newInput.substring(startIndex, endIndex + 1),
                `${filter.field}${filterSeparator}"${filter.value}"`
            );
        }
    });

    console.log('searchbar updated q:', newInput);
    return newInput.trim();
};

const extractQ = (input: string, filterSeparator: string) => {
    const reg = new RegExp(
        `[^\\s${filterSeparator}"]+(${filterSeparator}"){1}[^${filterSeparator}]+"\\s?`,
        'g'
    );
    return input.replace(reg, '');
};

const isEmpty = value => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim().length === 0) ||
        (Array.isArray(value) && value.length === 0)
    );
};

/**
 * Check whether two arrays of SearchFilter contain the same filters
 * @param a
 * @param b
 */
const isEqual = (a: SearchFilter[], b: SearchFilter[]) => {
    return (
        a?.length === b?.length &&
        a.every(sf1 => b.some(sf2 => sf1.filter === sf2.filter))
    );
};

export type SearchBarParams = {
    hintText?: string;
    to?: string;
    filters?:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
        | undefined;
    filterSeparator?: string;
};

/** TODO
 * - implementare logica per scrivere da q a fq e viceversa, in un componente che wrappa ActualSearchBar e FilterBox (vedi watch di useForm)
 * - verificare comportamento quando parse e format sono undefined
 * - impedire ricerca vuota se utente scrive in un campo e poi cancella manualmente
 * - sostituire double quotes hardcoded (es. in parseInput) con due props di SearchBar
 */

export const SearchBar = (props: SearchBarParams) => {
    const { hintText = 'Search', to, filters, filterSeparator = ':' } = props;
    const { params, setParams } = useSearch();
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const [record, setRecord] = useState({ id: '1', q: '' });
    const boxRef = useRef(null);

    const handleClickShowFilters = () => setShowFilters(show => !show);

    const handleOutsideClick = (event: MouseEvent) => {
        if (
            showFilters &&
            boxRef.current &&
            !boxRef.current.contains(event.target)
        ) {
            setShowFilters(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    });

    let conversionMap = {}; //{"metadata.name": {parse: f, format: f}}
    let defaultValues = {}; //{metadata: {name: "", description: ""}, type: ""}

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
                unflatten(
                    defaultValues,
                    element.props.source.split('.'),
                    element.props.defaultValue
                );
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
        let q = filterInputs.q;
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
                    if (!isEmpty(value)) {
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
        //setInputValue(parseInput(inputValue, fq, filterSeparator));

        //write input values into context
        setParams({ q: extractQ(q, filterSeparator), fq: fq });
        //close filter box
        setShowFilters(false);
        if (to) {
            navigate(to);
        }
    };

    return (
        <Box sx={{ marginRight: '50px' }} ref={boxRef}>
            <RecordContextProvider value={record}>
                <Stack>
                    <Form defaultValues={defaultValues}>
                        <div style={{ position: 'relative' }}>
                            <ActualSearchBar
                                hintText={hintText}
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
    const { hintText, handleEnter, handleClickShowFilters } = props;
    const { field } = useController({ name: 'q', defaultValue: '' });

    const formContext = useFormContext();

    const handleClickClear = () => {
        formContext.reset();
    };

    return (
        <MuiTextField
            {...field}
            variant="outlined"
            id="search-input"
            type="text"
            placeholder={hintText}
            onKeyDown={e => {
                if (e.key === 'Enter' && field.value)
                    handleEnter(formContext.getValues());
            }}
            InputProps={{
                sx: {
                    width: '50ch',
                    backgroundColor: 'white',
                    '& .MuiInputBase-input': {
                        padding: '8px 0',
                    },
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
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
                ),
            }}
        />
    );
};

const FilterBox = (props: any) => {
    const { showFilters, filters, handleClickSearch } = props;
    const [disabled, setDisabled] = useState(true);
    const formContext = useFormContext();
    const { isDirty } = useFormState();

    useEffect(() => {
        if (isDirty) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [isDirty]);

    return (
        <Box>
            {showFilters && (
                <Stack
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
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
                        disabled={disabled}
                        onClick={() =>
                            handleClickSearch(formContext.getValues())
                        }
                    >
                        Search
                    </Button>
                </Stack>
            )}
        </Box>
    );
};

export default SearchBar;
