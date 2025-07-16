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

import React, { useEffect, useState } from 'react';
import { useInput, InputProps, Labeled, InputHelperText } from 'react-admin';
import { Alert } from '@mui/material';

import ace from 'ace-builds/src-noconflict/ace';

export const AceEditorInput = (props: AceInputProps) => {
    const {
        mode = 'html',
        theme = 'monokai',
        useWorker = false,
        format = data => data,
        parse = data => data,
        //pick base from jsDelivr by default
        basePath = 'https://cdn.jsdelivr.net/npm/ace-builds@',
        label,
        helperText,
        fullWidth = false,
        minLines = 5,
        maxLines = 25,
        width = '50vw',
        onBlur,
        onChange,
        resource,
        source,
        disabled = false,
        ...rest
    } = props;

    const {
        id,
        field,
        fieldState: { isTouched, error: fieldError },
        formState: { isSubmitted },
        isRequired,
    } = useInput({
        resource,
        source,
        // Pass the event handlers to the hook but not the component as the field property already has them.
        // useInput will call the provided onChange and onBlur in addition to the default needed by react-hook-form.
        onChange,
        onBlur,
        disabled,
        ...rest,
    });

    //keep local state and debounce events from editor
    const [value, setValue] = useState<string>(
        field ? parse(field.value || '') : ''
    );
    const [error, setError] = useState<string>();

    //we need an effect to synchronize with external changes
    useEffect(() => {
        if (field?.value) {
            setValue(parse(field.value));
        }
    }, [field?.value]);

    //keep local value and sync with form after leave
    const onValueChange = (data: string) => {
        setValue(data);
    };
    const onLeave = () => {
        try {
            field.onChange(format(value));
            setError(undefined);
        } catch (e: any) {
            const msg =
                typeof e === 'string'
                    ? e
                    : e instanceof Error
                    ? e.message
                    : 'error';

            setError(msg);
        }
    };

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
        readOnly: disabled,
        minLines,
        maxLines,
    };

    // import workers (disabled by default)
    // NOTE: this should match *exactly* the included ace version
    ace.config.set('basePath', basePath + ace.version + '/src-noconflict/');

    return (
        <Labeled {...labelProps} id={id} component={'div'}>
            <>
                <AceEditor
                    mode={disabled ? 'text' : mode}
                    value={value}
                    onChange={onValueChange}
                    onBlur={onLeave}
                    theme={theme}
                    wrapEnabled
                    width={fullWidth ? '100%' : width}
                    setOptions={aceOptions}
                />
                {error || fieldError ? (
                    <Alert severity="error">
                        <InputHelperText
                            error={error ?? fieldError?.message}
                            helperText={helperText}
                        />
                    </Alert>
                ) : (
                    <InputHelperText helperText={helperText} />
                )}
            </>
        </Labeled>
    );
};

export type AceInputProps = InputProps & {
    format?: (string) => any | undefined;
    parse?: (any) => string | null;
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
    minLines?: number;
    maxLines?: number;
    theme?: 'github' | 'monokai' | 'solarized_dark' | 'solarized_light';
};
