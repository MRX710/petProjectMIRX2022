import { SortOrder } from "shared/types/baseFilters";
import { IArticleSortField } from "features/articlesSort/model/types/articlesSort";
import { ArticleEnum } from "entities/Article/model/types/article";

export interface IArticlesSortScheme {
   order: SortOrder
   sort: IArticleSortField
   search: string | null
   type: ArticleEnum
}
