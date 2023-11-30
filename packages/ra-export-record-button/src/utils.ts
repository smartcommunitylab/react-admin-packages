import yaml, { CreateNodeOptions, ToStringOptions } from 'yaml';

export const toJson = (obj: any) => {
    return obj ? JSON.stringify(obj, null, 2) : '{}';
};

export const toYaml = (
    obj: any,
    options?: CreateNodeOptions & ToStringOptions
) => {
    const opt = {
        ...options,
        aliasDuplicateObjects: false,
    };
    return obj ? yaml.stringify(obj, opt) : '';
};
