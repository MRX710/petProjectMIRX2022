import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Currency } from 'entities/Currency';
import { Select } from "./Select";

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Placeholder',
    options: [
        { value: Currency.RUB, content: Currency.RUB },
        { value: Currency.USD, content: Currency.USD },
        { value: Currency.EUR, content: Currency.EUR },
    ],
};
