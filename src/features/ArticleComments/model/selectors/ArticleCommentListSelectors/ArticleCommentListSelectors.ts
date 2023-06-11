import { StateScheme } from "app/providers/StoreProvider";

export const getArticleCommentsIsLoading = ((state: StateScheme) => state?.ArticleCommentsList?.isLoading);
export const getArticleCommentsError = ((state: StateScheme) => state?.ArticleCommentsList?.error);
