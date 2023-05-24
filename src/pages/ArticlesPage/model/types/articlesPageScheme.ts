import { EntityState } from "@reduxjs/toolkit";
import { IArticle, IArticleView } from "entities/Article";

export interface IArticlesPageScheme extends EntityState<IArticle> {
   isLoading?: boolean
   error?: string
   view: IArticleView
}
