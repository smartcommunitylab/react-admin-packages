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
import { Form, RecordContextProvider } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { SearchFilter } from './SearchProvider';

const getEntries = (o, prefix = '') =>
    Object.entries(o).flatMap(([k, v]) =>
        Object(v) === v
            ? getEntries(v, `${prefix}${k}.`)
            : [[`${prefix}${k}`, v]]
    );

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

    const handleClickShowFilters = () => setShowFilters(show => !show);
    const handleClickSearch = (filterInputs: any) => {
        console.log('filterInputs ', filterInputs);
        const flattenedInputs = Object.fromEntries(getEntries(filterInputs));
        let fq: SearchFilter[] = [];

        if (Array.isArray(filters)) {
            fq = filters.map(filter => {
                const source = filter.props.source;
                const value = flattenedInputs[source];
                return { filter: source + ':' + value };
            });
        }

        //write input values into context
        setParams({ q: inputValue, fq: fq });
        //close filter box
        setShowFilters(false);
        if (to) {
            navigate(to);
        }
    };

    //TODO
    const handleClickClear = () => {};

    const record = {
        id: '1',
    };

    return (
        <Box sx={{ marginRight: '50px' }}>
            <RecordContextProvider value={record}>
                <Stack>
                    <Form>
                        <ActualSearchBar
                            hintText={hintText}
                            value={inputValue}
                            setValue={setInputValue}
                            handleEnter={handleClickSearch}
                            handleClickClear={handleClickClear}
                            handleClickShowFilters={handleClickShowFilters}
                        />
                        <FilterBox
                            showFilters={showFilters}
                            filters={filters}
                            handleClickSearch={handleClickSearch}
                        />
                    </Form>
                </Stack>
            </RecordContextProvider>
        </Box>
    );
};

const ActualSearchBar = (props: any) => {
    const {
        hintText,
        value,
        setValue,
        handleEnter,
        handleClickClear,
        handleClickShowFilters,
    } = props;

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
                    if (e.key === 'Enter') handleEnter();
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
                <Stack sx={{ border: 1, backgroundColor: 'white' }}>
                    {filters}
                    <Button
                        variant="text"
                        aria-controls="search-button"
                        aria-label=""
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
