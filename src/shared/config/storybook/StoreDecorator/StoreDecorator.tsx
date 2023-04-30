import { Story } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (state: DeepPartial<StateScheme>) => (StoryComponent: Story) => (
    <StoreProvider initialState={state as StateScheme}>
        <StoryComponent />
    </StoreProvider>
);

