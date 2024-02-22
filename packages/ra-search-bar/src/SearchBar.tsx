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
    const handleClickSearch = () => {
        //write input value into context
        setParams({ q: inputValue });
        //navigate if "to"
        if (to) {
            navigate(to);
        }
    };
    const handleClickClear = () => {};

    return (
        <Box sx={{ marginRight: '50px' }}>
            <Stack>
                <FormControl variant="outlined">
                    <OutlinedInput
                        id="search-input"
                        type="text"
                        placeholder={hintText}
                        sx={{
                            backgroundColor: 'white',
                            width: '50ch',
                        }}
                        value={inputValue}
                        onChange={event => {
                            setInputValue(event.target.value);
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') handleClickSearch();
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
                <Box>
                    {showFilters && (
                        <Grid
                            container
                            sx={{ border: 1, backgroundColor: 'white' }}
                        >
                            <Grid
                                item
                                xs={12}
                                sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                            >
                                <div>some filters here</div>
                            </Grid>
                            <Grid item xs={9}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
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
