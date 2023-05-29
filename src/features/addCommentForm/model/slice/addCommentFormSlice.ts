import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddCommentFormScheme } from '../types/addCommentForm';


const initialState: IAddCommentFormScheme = {
    text: null,
    error: undefined,
};

export const addCommentFormSlice = createSlice({
    name: 'addCommentFormSlice',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string | null>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchArticleById.pending, (state, action) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
    //             state.isLoading = false;
    //             state.data = action?.payload;
    //         })
    //         .addCase(fetchArticleById.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});
export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
