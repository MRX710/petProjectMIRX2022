import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CurrencySelect } from "./CurrencySelect";

export default {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = () => <CurrencySelect />;

export const Primary = Template.bind({});
Primary.args = {};
