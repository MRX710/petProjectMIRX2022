import { IUser } from "entities/User";

export enum ArticleBlockEnum {
   CODE = 'CODE',
   IMAGE = 'IMAGE',
   TEXT = 'TEXT',
}

export interface IArticleBlockBase {
   id: string
   type: ArticleBlockEnum
}

export interface IArticleCodeBlock extends IArticleBlockBase {
   type: ArticleBlockEnum.CODE
   code: string
}

export interface IArticleImageBlock extends IArticleBlockBase {
   type: ArticleBlockEnum.IMAGE
   src: string
   title: string
}

export interface IArticleTextBlock extends IArticleBlockBase {
   type: ArticleBlockEnum.TEXT
   paragraphs: string[]
   title?: string
}

export type TArticleBlock = IArticleCodeBlock | IArticleImageBlock | IArticleTextBlock

export enum ArticleEnum {
   ALL = 'ALL',
   IT = "IT",
   SCIENCE = "SCIENCE",
   ECONOMICS = "ECONOMICS",
}

export interface IArticle {
   "id": string,
   "title": string,
   "subtitle": string,
   "img": string,
   "views": number,
   "createAt": string,
   "type": ArticleEnum[],
   "user": IUser
   "blocks": TArticleBlock[]
}

// articles

export enum IArticleView {
   LIST = 'LIST',
   TILE = 'TILE'
}
