import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    text: 'import React from \'react\';\n'
       + 'import { ComponentStory, ComponentMeta } from \'@storybook/react\';\n'
       + 'import { Code } from \'./Code\';\n'
       + '\n'
       + 'export default {\n'
       + '    title: \'shared/Code\',\n'
       + '    component: Code,\n'
       + '    argTypes: {\n'
       + '        backgroundColor: { control: \'color\' },\n'
       + '    },\n'
       + '} as ComponentMeta<typeof Code>;',
};


export const Dark = Template.bind({});
Dark.args = {
    text: 'import React from \'react\';\n'
       + 'import { ComponentStory, ComponentMeta } from \'@storybook/react\';\n'
       + 'import { Code } from \'./Code\';\n'
       + '\n'
       + 'export default {\n'
       + '    title: \'shared/Code\',\n'
       + '    component: Code,\n'
       + '    argTypes: {\n'
       + '        backgroundColor: { control: \'color\' },\n'
       + '    },\n'
       + '} as ComponentMeta<typeof Code>;',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
