import { Story } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'entities/Profile';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import { addCommentFormReducer } from "features/addCommentForm/model/slice/addCommentFormSlice";
import { ArticleDetailsCommentsReducer } from "pages/ArticleDetailPage/model/slice/ArticleDetailsCommentsSlice";

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsComments: ArticleDetailsCommentsReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateScheme>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>,
) => (StoryComponent: Story) => (

    <StoreProvider
        initialState={state as StateScheme}
        asyncReducers={{ ...defaultAsyncReducers, ...Object.assign(asyncReducers || {}) }}
    >
        <StoryComponent />
    </StoreProvider>
);

