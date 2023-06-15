import { StateScheme } from "app/providers/StoreProvider";
import { ArticleEnum } from "entities/Article/model/consts/consts";
import { IArticleSortField } from "../../model/types/articlesSort";

export const getArticlesFiltersOrder = (state: StateScheme) => state.articlesSort?.order ?? "asc";
export const getArticlesFiltersSort = (state: StateScheme) => state.articlesSort?.sort ?? IArticleSortField.CREATED;
export const getArticlesFiltersSearch = (state: StateScheme) => state.articlesSort?.search ?? null;
export const getArticlesFiltersType = (state: StateScheme) => state.articlesSort?.type ?? ArticleEnum.ALL;
