import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ClearIcon from '@mui/icons-material/Clear';

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

    const handleClickShowFilters = () => setShowFilters(show => !show);
    const handleClickSearch = () => {
        //TODO write input value into context
        //TODO navigate if "to"
    };
    const handleClickClear = () => {};

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Stack>
                <FormControl variant="outlined">
                    <OutlinedInput
                        id="search-input"
                        type="text"
                        placeholder={hintText}
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
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    {showFilters && (
                        <Grid container sx={{ border: 1 }}>
                            <Grid item xs={12}>
                                <div>some filters here</div>
                            </Grid>
                            <Grid item xs={8}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="text"
                                    aria-controls="search-button"
                                    aria-label=""
                                    onClick={handleClickSearch}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Stack>
        </Box>
    );
};

export default SearchBar;
