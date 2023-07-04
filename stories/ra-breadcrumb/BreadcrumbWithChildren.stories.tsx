import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem } from '../../packages/ra-breadcrumb/src';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Example/Breadcrumb',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const BreadcrumbWithChildren: Story = {
    render: args => {
        return (
            <Breadcrumb {...args}>
                <BreadcrumbItem name="Home" to="/" />
                <BreadcrumbItem name="Page1" to="/page1" />
                <BreadcrumbItem name="Page2" />
            </Breadcrumb>
        );
    },
    args: {
        separator: '/',
        maxItems: 4,
    },
};
