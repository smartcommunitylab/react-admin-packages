import React from 'react';
import { AdminContext, SimpleForm } from 'react-admin';
import { Card, CardContent } from '@mui/material';

import { AceEditorInput as EditorInput } from '../components/AceEditorInput';

const Wrapper = ({ children, ...props }: any) => (
    <AdminContext {...props}>{children}</AdminContext>
);

export interface AceEditorProps {
    record: any;
    source: string;
    value?: string;
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
    fullWidth?: boolean;
    helperText?: string;
    theme?: 'github' | 'monokai' | 'solarized_dark' | 'solarized_light';
}

export const AceEditorInput = ({
    record,
    source,
    mode,
    fullWidth,
    theme,
    helperText,
    ...props
}: AceEditorProps) => {
    const aceProps = { mode, theme, fullWidth, helperText };
    return (
        <Wrapper>
            <Card>
                <CardContent>
                    <SimpleForm resource="posts" record={record}>
                        <EditorInput
                            label={mode}
                            source={source}
                            {...aceProps}
                        />
                    </SimpleForm>
                </CardContent>
            </Card>
        </Wrapper>
    );
};
