import { Exporter } from 'react-admin';
import downloadYaml from './downloadYaml';
import yaml, { CreateNodeOptions, ToStringOptions } from 'yaml';

const defaultOptions = {
    aliasDuplicateObjects: false,
};

export const yamlExport = (
    data: any,
    key?: string,
    fields?: string[],
    options?: CreateNodeOptions & ToStringOptions
) => {
    const k = key || 'list';
    const entries =
        data instanceof Array
            ? data
            : k in data && data[k] instanceof Array
            ? data[k]
            : [];
    const obj = { [k]: entries };

    if (fields) {
        const records = entries.map(r => {
            return fields.reduce((o, key) => ((o[key] = r[key]), o), {});
        });
        obj[k] = records;
    }

    return yaml.stringify(obj, options || defaultOptions);
};

export const yamlExporter: Exporter = (data, _, __, resource) => {
    let obj = data as any;
    const key = resource || 'records';
    if (data instanceof Array) {
        //convert data to a nested yaml with the list set as array under the `resource` key
        obj = { [key]: data };
    }

    const value = yamlExport(obj, key);
    downloadYaml(value, key);
};
