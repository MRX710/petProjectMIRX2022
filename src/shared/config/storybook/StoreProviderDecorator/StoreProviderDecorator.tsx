import { Story } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreProviderDecorator = (story: () => Story) => (
    <StoreProvider>
        {story()}
    </StoreProvider>
);
// export const StoreProviderDecorator = (initialState?: DeepPartial<StateScheme>) => (StoryComponent: Story) => (
//     <StoreProvider initialState={initialState as StateScheme}>
//         {story()}
//     </StoreProvider>
// );
