import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;
// const initialState: DeepPartial<StateScheme> = {
//     profile: {
//         form: {
//             firstname: "MIRX",
//             lastname: "MIRX001",
//             age: 21,
//             currency: Currency.RUB,
//             country: Country.Russia,
//             city: "Krasnodar",
//             username: "admin",
//         },
//     },
// };

export const Normal = Template.bind({});
Normal.args = {};
// Normal.decorators = [
//     StoreDecorator(initialState as DeepPartial<StateScheme>),
// ];

export const Dark = Template.bind({});
Dark.args = {};
// Dark.decorators = [
//     ThemeDecorator(Theme.DARK),
//     StoreDecorator(initialState as DeepPartial<StateScheme>),
// ];
