import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AceEditorInput } from './AceEditorInput';

export default {
    title: 'Ra-Ace-Editor/AceEditorInput',
    component: AceEditorInput,
    argTypes: {},
    args: {
        fullWidth: false,
        theme: 'monokai',
        record: { id: 0, body: '' },
        source: 'body',
    },
} as ComponentMeta<typeof AceEditorInput>;

const Template: ComponentStory<typeof AceEditorInput> = args => (
    <AceEditorInput {...args} />
);

export const HtmlEditor = Template.bind({});
HtmlEditor.args = {
    record: { body: 'Some <strong>html</strong> text' },
    mode: 'html',
};

export const JavascriptEditor = Template.bind({});
JavascriptEditor.args = {
    record: {
        body: `function say(value) {
    return value;
};`,
    },
    mode: 'javascript',
};

export const JsonEditor = Template.bind({});
JsonEditor.args = {
    record: { body: '{"id":0, "body":"text value"}' },
    mode: 'json',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
    ...HtmlEditor.args,
    helperText: 'Edit html via editor',
};
