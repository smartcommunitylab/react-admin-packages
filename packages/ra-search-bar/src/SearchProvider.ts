import { GetListResult, Identifier, RaRecord } from 'react-admin';

export type SearchProvider = {
    search: (params: SearchParams, resource?: string) => Promise<SearchResults>;
};

export interface SearchParams {
    q?: string;
    fq?: SearchFilter[];
}

export interface SearchFilter {
    field?: string;
    value?: string;
    filter: string;
}

export interface SearchResults extends GetListResult<SearchRecord> {
    searchParams?: SearchParams;
}

export interface SearchRecord extends RaRecord<Identifier> {
    resource: string;
}
