import { StateScheme } from "app/providers/StoreProvider";
import { IArticleView } from "entities/Article";

export const getArticlesLoading = (state: StateScheme) => state?.articlesPage?.isLoading;
export const getArticlesError = (state: StateScheme) => state?.articlesPage?.error;
export const getArticlesView = (state: StateScheme) => state?.articlesPage?.view || IArticleView.TILE;
export const getArticlesPageNum = (state: StateScheme) => state?.articlesPage?.page || 1;
export const getArticlesLimit = (state: StateScheme) => state?.articlesPage?.limit || 9;
export const getArticlesHasMore = (state: StateScheme) => state?.articlesPage?.hasMore;
