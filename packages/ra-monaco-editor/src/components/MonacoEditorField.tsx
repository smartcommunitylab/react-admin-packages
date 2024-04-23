import { useRecordContext, FieldProps } from 'react-admin';
import Editor from '@monaco-editor/react';
import { Fragment } from 'react';
import { get } from 'lodash';
import React from 'react';

export const MonacoEditorField = (props: MonacoFieldProps) => {
    const {
        language = 'html',
        theme = 'vs-dark',
        width = '100%',
        height = '100%',
        source = '',
    } = props;

    const record = useRecordContext(props);
    const value = get(record, source);


    return (
        <Fragment>
            <Editor
                defaultLanguage={language}
                defaultValue={source}
                theme={theme}
                width={width}
                height={height}
                options={{ fontSize: 20, readOnly:true }}
            />
        </Fragment>
    );
};

export interface MonacoFieldProps extends FieldProps {
    source: string;
    language?:
        | 'java'
        | 'javascript'
        | 'markdown'
        | 'drools'
        | 'html'
        | 'python'
        | 'json'
        | 'sql'
        | 'typescript'
        | 'css'
        | 'yaml'
        | 'text';
        width?: string | number;
        height?: string | number;
        theme?: string;
}
