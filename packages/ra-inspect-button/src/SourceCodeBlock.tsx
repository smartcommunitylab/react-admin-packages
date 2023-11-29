import React from 'react';
import { Container } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import hlJson from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import hlYaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';
import themeVS2015 from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015';
import themeGithub from 'react-syntax-highlighter/dist/esm/styles/hljs/github';
import CopyToClipboardButton from './CopyToClipboardButton';

SyntaxHighlighter.registerLanguage('json', hlJson);
SyntaxHighlighter.registerLanguage('yaml', hlYaml);

export const SourceCodeBlock = (props: SourceCodeBlockProps) => {
    const {
        code,
        language = 'json',
        theme = 'dark',
        showLineNumbers = false,
        showCopyButton = true,
    } = props;

    const style = theme === 'dark' ? themeVS2015 : themeGithub;

    return (
        <Container disableGutters>
            {showCopyButton && <CopyToClipboardButton value={code} />}
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
    code: string;
    language?: string;
    showCopyButton?: boolean;
    showLineNumbers?: boolean;
    theme?: 'light' | 'dark';
};
