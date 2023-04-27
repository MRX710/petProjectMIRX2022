import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.\n'
       + '                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.\n'
       + '                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.\n'
       + '                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.\n'
       + '                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.\n'
       + '                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.\n'
       + '                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.\n'
       + '                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.\n'
       + '                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.\n'
       + '                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus magni nihil officiis possimus.\n'
       + '                Ab ad animi asperiores, cupiditate dicta fugiat fugit id neque nisi nostrum quaerat qui ratione, suscipit.',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
