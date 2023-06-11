import { StateScheme } from "app/providers/StoreProvider";

export const getArticleCommentFormText = (state: StateScheme) => state?.ArticleCommentForm?.text ?? null;
export const getArticleCommentFormError = (state: StateScheme) => state?.ArticleCommentForm?.error;
