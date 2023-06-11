import { FC, lazy } from 'react';
import { IArticleCommentsProps } from "./ArticleComments";

export const ArticleCommentsAsync = lazy<FC<IArticleCommentsProps>>(() => import('./ArticleComments'));
