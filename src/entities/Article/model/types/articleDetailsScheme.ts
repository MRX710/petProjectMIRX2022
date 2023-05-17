import { IArticle } from "./article";

export interface IArticleDetailsScheme {
   isLoading: boolean
   error?: string
   data?: IArticle
}
