import { DataProvider, GetListParams, RaRecord } from 'react-admin';

export const withResourceContext = (
    dataProvider: DataProvider,
    context: string | undefined
): DataProvider => {
    console.log('new withResourceContext', context);
    return {
        ...dataProvider,
        getList: async function <RecordType extends RaRecord = any>(
            resource: string,
            params: GetListParams
        ) {
            console.log('getList with context', context);
            const newParams = {
                ...params,
                meta: { context: context },
            };
            return dataProvider.getList<RecordType>(resource, newParams);
        },
    };
};
