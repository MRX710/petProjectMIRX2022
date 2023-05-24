import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AvatarIcon from "shared/assets/tests/avatar.webp";
import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    src: AvatarIcon,
};
