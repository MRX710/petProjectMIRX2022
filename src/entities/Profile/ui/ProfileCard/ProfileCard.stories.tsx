import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import Avatar from "shared/assets/tests/avatar.webp";
import { ProfileCard } from './ProfileCard';


export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        id: "1",
        firstname: "MIRX",
        lastname: "MIRX01",
        age: 21,
        currency: Currency.RUB,
        country: Country.Russia,
        city: "Krasnodar",
        username: "admin",
        avatar: Avatar,
    },
};
Primary.decorators = [];


export const Error = Template.bind({});
Error.args = {
    error: 'Error',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
