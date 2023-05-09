import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { IProfileScheme } from 'entities/Profile';
import { StateScheme } from 'app/providers/StoreProvider';
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;
const initialState: DeepPartial<StateScheme> = {
    profile: {
        form: {
            firstname: "MIRX",
            lastname: "MIRX001",
            age: 21,
            currency: Currency.RUB,
            country: Country.Russia,
            city: "Krasnodar",
            username: "admin",
        },
    },
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator(initialState as DeepPartial<StateScheme>),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator(initialState as DeepPartial<StateScheme>),
];
