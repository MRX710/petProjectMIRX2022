import { StateScheme } from "app/providers/StoreProvider";
import { IArticleView } from "entities/Article";

export const getArticlesLoading = (state: StateScheme) => state?.articlesPage?.isLoading;
export const getArticlesError = (state: StateScheme) => state?.articlesPage?.error;
export const getArticlesView = (state: StateScheme) => state?.articlesPage?.view || IArticleView.TILE;
