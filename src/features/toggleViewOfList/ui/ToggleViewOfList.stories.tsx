import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToggleViewOfList } from './ToggleViewOfList';

export default {
    title: 'features/ToggleViewOfList',
    component: ToggleViewOfList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ToggleViewOfList>;

const Template: ComponentStory<typeof ToggleViewOfList> = (args) => <ToggleViewOfList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
