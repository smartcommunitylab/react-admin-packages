import { useInput, InputProps, Labeled, InputHelperText } from 'react-admin';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-drools';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-text';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import { Fragment } from 'react';
import React from 'react';

const ace = require('ace-builds/src-noconflict/ace');

export const AceEditorInput = (props: AceInputProps) => {
    const {
        mode = 'html',
        theme = 'monokai',
        useWorker = false,
        //pick base from jsDelivr by default
        basePath = 'https://cdn.jsdelivr.net/npm/ace-builds@',
        label,
        helperText,
        fullWidth = false,
        width = '50vw',
        onBlur,
        onChange,
        resource,
        source,
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
        source,
    };

    //TODO let users customize options
    const aceOptions = {
        useWorker: useWorker,
        showPrintMargin: false,
    };

    // import workers (disabled by default)
    // NOTE: this should match *exactly* the included ace version
    ace.config.set('basePath', basePath + ace.version + '/src-noconflict/');

    return (
        <Fragment>
            <Labeled {...labelProps} id={id}>
                <AceEditor
                    {...field}
                    mode={mode}
                    theme={theme}
                    wrapEnabled
                    width={fullWidth ? '100%' : width}
                    setOptions={aceOptions}
                />
            </Labeled>
            <InputHelperText
                touched={isTouched || isSubmitted}
                error={error?.message}
                helperText={helperText}
            />
        </Fragment>
    );
};

export type AceInputProps = InputProps & {
    mode?:
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
    //use a worker for syntax check
    //disabled by default, loads from external cdn
    useWorker?: boolean;
    basePath?: string;
    fullWidth?: boolean;
    width?: string;
    theme?: 'github' | 'monokai' | 'solarized_dark' | 'solarized_light';
};
