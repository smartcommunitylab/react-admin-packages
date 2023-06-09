import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AceEditorField } from './AceEditorField';

export default {
    title: 'Ra-Ace-Editor/AceEditorField',
    component: AceEditorField,
    argTypes: {},
    args: {
        fullWidth: false,
        theme: 'github',
        record: { id: 0, body: '' },
        source: 'body',
    },
} as ComponentMeta<typeof AceEditorField>;

const Template: ComponentStory<typeof AceEditorField> = args => (
    <AceEditorField {...args} />
);

export const HtmlField = Template.bind({});
HtmlField.args = {
    record: { body: 'Some <strong>html</strong> text' },
    mode: 'html',
};

export const JavascriptField = Template.bind({});
JavascriptField.args = {
    record: {
        body: `function say(value) {
    return value;
};`,
    },
    mode: 'javascript',
};

export const JsonField = Template.bind({});
JsonField.args = {
    record: { body: '{"id":0, "body":"text value"}' },
    mode: 'json',
};

export const WithLightTheme = Template.bind({});
WithLightTheme.args = {
    ...JavascriptField.args,
    theme: 'github',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
    ...JavascriptField.args,
    fullWidth: true,
};
