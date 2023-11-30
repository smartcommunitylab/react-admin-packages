import React from 'react';
import { Container } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import hlJson from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import hlYaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';
import themeVS2015 from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015';
import themeGithub from 'react-syntax-highlighter/dist/esm/styles/hljs/github';
import CopyToClipboardButton from './CopyToClipboardButton';
import { TopToolbar } from 'react-admin';

SyntaxHighlighter.registerLanguage('json', hlJson);
SyntaxHighlighter.registerLanguage('yaml', hlYaml);

export const SourceCodeBlock = (props: SourceCodeBlockProps) => {
    const {
        code,
        language = 'json',
        theme = 'dark',
        showLineNumbers = false,
        showCopyButton = true,
        onCopyButtonSuccess,
    } = props;

    const style = theme === 'dark' ? themeVS2015 : themeGithub;

    return (
        <Container disableGutters>
            {showCopyButton && (
                <TopToolbar
                    variant="dense"
                    sx={{ padding: 0, minHeight: '32px' }}
                >
                    <CopyToClipboardButton
                        value={code}
                        onSuccess={onCopyButtonSuccess}
                    />
                </TopToolbar>
            )}
            <SyntaxHighlighter
                language={language}
                style={style}
                showLineNumbers={showLineNumbers}
                wrapLongLines
            >
                {code}
            </SyntaxHighlighter>
        </Container>
    );
};

export type SourceCodeBlockProps = {
    /**
     * Source code as string. Required.
     */
    code: string;
    /**
     * (Optional) language for syntax highlighter
     */
    language?: string;
    /**
     * Theme. Defaults to `dark`
     */
    theme?: 'light' | 'dark';
    /**
     * Show or hide the line numbers. Defaults to `false`
     */
    showLineNumbers?: boolean;
    /**
     * Show or hide the copy button. Default to `true`
     */
    showCopyButton?: boolean;
    /**
     * (Optional) handler for copy button success
     */
    onCopyButtonSuccess?: (e: Event) => void;
};
