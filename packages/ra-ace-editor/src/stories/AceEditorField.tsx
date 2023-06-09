import React from 'react';
import {
    AdminContext,
    ResourceContextProvider,
    SimpleShowLayout,
} from 'react-admin';
import { Card, CardContent } from '@mui/material';

import { AceEditorField as AceField } from '../components/AceEditorField';

const Wrapper = ({ record, children, ...props }: any) => (
    <AdminContext {...props}>
        <ResourceContextProvider value="posts">
            <Card>
                <CardContent>
                    <SimpleShowLayout record={record}>
                        {children}
                    </SimpleShowLayout>
                </CardContent>
            </Card>
        </ResourceContextProvider>
    </AdminContext>
);

export interface AceEditorProps {
    record: any;
    source: string;
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

export const AceEditorField = ({
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
        <Wrapper record={record}>
            <AceField label={mode} source={source} {...aceProps} />
        </Wrapper>
    );
};
