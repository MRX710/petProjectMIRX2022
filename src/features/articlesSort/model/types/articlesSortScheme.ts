import { SortOrder } from "shared/types/baseFilters";
import { ArticleEnum } from "entities/Article/model/consts/consts";
import { IArticleSortField } from "./articlesSort";

export interface IArticlesSortScheme {
    order: SortOrder
    sort: IArticleSortField
    search: string | null
    type: ArticleEnum
}
