import yaml from 'yaml';

const toJson = (obj: any) => {
    return obj ? JSON.stringify(obj, null, 2) : '{}';
};

const toYaml = (obj: any) => {
    const options = {
        aliasDuplicateObjects: false,
    };
    return obj ? yaml.stringify(obj, options) : '';
};

export const toCode = (language: string, obj: any) => {
    if (language === 'json') {
        return toJson(obj);
    } else if (language === 'yaml') {
        return toYaml(obj);
    }

    return '';
};

export const copyToClipboard = async (value: string) => {
    if (value) {
        //use clipboard api
        return navigator.clipboard.writeText(value);
    }
};
