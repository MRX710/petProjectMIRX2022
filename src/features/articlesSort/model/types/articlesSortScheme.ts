import { SortOrder } from "shared/types/baseFilters";
import { ArticleEnum } from "entities/Article/model/types/article";
import { IArticleSortField } from "./articlesSort";

export interface IArticlesSortScheme {
   order: SortOrder
   sort: IArticleSortField
   search: string | null
   type: ArticleEnum
}
