import { Preview } from '@storybook/react';
import { Stories } from '@storybook/blocks';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        docs: {
            page: () => (
                    <>
                        <Stories />
                    </>
                ),
        },
    },
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
};

export default preview;
