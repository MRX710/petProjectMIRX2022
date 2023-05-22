import { StateScheme } from "app/providers/StoreProvider";

export const getArticleDetailsCommentsIsLoading = ((state: StateScheme) => state?.articleDetailsComments?.isLoading);
export const getArticleDetailsCommentsError = ((state: StateScheme) => state?.articleDetailsComments?.error);
