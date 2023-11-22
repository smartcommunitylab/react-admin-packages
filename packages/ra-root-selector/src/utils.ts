import { DataProvider } from 'react-admin';

export const isValidDataProvider = (f: any): f is DataProvider => {
    //duck test
    const methods = [
        'getList',
        'getOne',
        'getMany',
        'getManyReference',
        'update',
        'updateMany',
        'create',
        'delete',
        'deleteMany',
    ];

    if (f && methods.filter(m => !(m in f)).length === 0) {
        return true;
    }
    return false;
};

export const withRootSelector = (
    dataProvider: DataProvider,
    root: string | undefined
): DataProvider => {
    function injectRoot(params: any) {
        const meta = params?.meta || {};
        meta.root = root;
        return {
            ...params,
            meta,
        };
    }

    //explode and patch default methods
    const {
        getList,
        getOne,
        getMany,
        getManyReference,
        update,
        updateMany,
        create,
        delete: deleteOne,
        deleteMany,
        ...rest
    } = dataProvider;

    return {
        getList: (resource, params) => {
            return getList(resource, injectRoot(params));
        },
        getOne: (resource, params) => {
            return getOne(resource, injectRoot(params));
        },
        getMany: (resource, params) => {
            return getMany(resource, injectRoot(params));
        },
        getManyReference: (resource, params) => {
            return getManyReference(resource, injectRoot(params));
        },
        update: (resource, params) => {
            return update(resource, injectRoot(params));
        },
        updateMany: (resource, params) => {
            return updateMany(resource, injectRoot(params));
        },
        create: (resource, params) => {
            return create(resource, injectRoot(params));
        },
        delete: (resource, params) => {
            return deleteOne(resource, injectRoot(params));
        },
        deleteMany: (resource, params) => {
            return deleteMany(resource, injectRoot(params));
        },
        ...rest,
    };
};
