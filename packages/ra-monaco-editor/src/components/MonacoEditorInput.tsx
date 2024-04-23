import { InputProps, Labeled, useInput } from 'react-admin';

import Editor from '@monaco-editor/react';
import React from 'react';
import { Fragment } from 'react';


export const MonacoEditorInput = (props: MonacoInputProps) => {
    const {
        language = 'javascript',
        theme = 'vs-dark',
        fullWidth = false,
        width ,
        height = '100%',
        onBlur,
        onChange,
        source,
        label,
        resource
    } = props;

    const {
        id,
        field,
        fieldState: { isTouched, error },
        formState: { isSubmitted },
        isRequired,
    } = useInput({
        // Pass the event handlers to the hook but not the component as the field property already has them.
        // useInput will call the provided onChange and onBlur in addition to the default needed by react-hook-form.
        onChange,
        onBlur,
        ...props,
    });

    const labelProps = {
        fullWidth,
        isRequired,
        label,
        resource,
    };
    return (
        <Fragment>
            <Labeled {...labelProps} id={id}>
                <Editor
                    defaultLanguage={language}
                    defaultValue={source}
                    theme={theme}
                    width={fullWidth ? '100%' : width}
                    height={height}
                    options={{ fontSize: 20, readOnly:false }}
                    />
                   </Labeled>

        </Fragment>
    );
};

export type MonacoInputProps = InputProps & {
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
    useWorker?: boolean;
    basePath?: string;
    fullWidth?: boolean;
    width?: string | number;
    height?: string | number;
    theme?: string;
};
